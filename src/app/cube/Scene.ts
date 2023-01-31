import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Mesh, Object3D} from "three";



export class Scene{
    private scene!: THREE.Scene;


    private import = new GLTFLoader();
    private obj:Object3D = new THREE.Object3D;
    public texture: string = "../../assets/textures/FloorTileClean_normal.png";
    private loader = new THREE.TextureLoader();

    private raycaster = new THREE.Raycaster();
    private pointer = new THREE.Vector2();



    constructor() {
    }


    //SCENE BUILDER

    public createScene(){

        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AxesHelper(50));
        this.loadLight();
        this.loadImportObj();
        this.loadGeometrie();
    }



    private loadImportObj(){
        this.import.load('../../assets/3D/character_rogue.gltf', (gltf) => {
            this.obj = gltf.scene.children[0];
            this.obj.position.y = 1;
            this.obj.scale.x = 5;
            this.obj.scale.y = 5;
            this.obj.scale.z = 5;
            this.obj.traverse(function (node) {
                if (node)
                node.castShadow = true;
                node.userData['name'] = "caractere";
            })
            this.scene.add(this.obj);
        });
    }

    //3D OBJECT LOAD

    private loadLight(){
        const ambiantLight = new THREE.AmbientLight(0xffffff, 2);
        ambiantLight.position.set(0,2,0);

        const light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set( 0, 10, 0 ); //default; light shining from top
        light.castShadow = true; // default false
        this.scene.add( light );
    }



    /*private createFloor(){
        this.loadGeometrie();

    }*/

    private loadGeometrie(){
        const cubeGeometry = new THREE.BoxGeometry(40,2,40);

        const planeMaterial = new THREE.MeshStandardMaterial({ map: this.loader.load(this.texture)});
        const cube = new THREE.Mesh( cubeGeometry, planeMaterial );
        cube.receiveShadow = true;
        cube.userData['ground'] = true;
        cube.userData['name'] = "ground";
        this.scene.add( cube );

        let smallCubeMatr: THREE.Mesh[][];
        const smallCubeGeometry = new THREE.BoxGeometry(8,2,8);



        for (let x = 0; x < cubeGeometry.parameters.width; x += 10){
            for (let z = 0; z < cubeGeometry.parameters.depth; z = z + 10){
                const smallCubeMaterial = new THREE.MeshStandardMaterial({
                    color:0x0000ff,
                    transparent: true,
                    opacity: 0.10
                });
                const smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterial);
                smallCube.position.x = -((cubeGeometry.parameters.width/2)-(smallCubeGeometry.parameters.width/2) - 1 - x);
                smallCube.position.y = 2;
                smallCube.position.z = -((cubeGeometry.parameters.depth/2)-(smallCubeGeometry.parameters.width/2) - 1 - z);
                smallCube.userData['Case'] = true;
                smallCube.name = `cube ${x}${z}`;
                this.scene.add(smallCube);

            }
        }
    }





    //ANIMATION

    public animationCube(){
        //this.obj.rotation.y += 0.2;
    }


    //USER EVENT




    public getScene(): THREE.Scene{
        return this.scene;
    }

}