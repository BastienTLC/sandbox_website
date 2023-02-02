import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Mesh, Object3D, Vector3} from "three";
import { CubeComponent } from './cube.component';





export class Scene{
    private scene!: THREE.Scene;


    private import = new GLTFLoader();
    private obj:Object3D = new THREE.Object3D;
    public texture: string = "../../assets/textures/BlocTexture.png";
    public texture2: string = "../../assets/textures/HoverBloque.png";
    private loader = new THREE.TextureLoader();

    //
    private floor = new THREE.Group();
    private hoverFloor = new THREE.Group;

    private raycaster = new THREE.Raycaster();
    private pointer = new THREE.Vector2();

    public isInMouvement:Boolean = false;


    constructor(private cube: CubeComponent) {}


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
            /*this.obj.scale.x = 5;
            this.obj.scale.y = 5;
            this.obj.scale.z = 5;*/
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
        /*const Alight = new THREE.AmbientLight( 0x707070, 2 ); // soft white light
        this.scene.add( Alight );*/

        const light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set( 0, 10, 0 ); //default; light shining from top
        light.castShadow = true; // default false
        this.scene.add( light );
    }



    /*private createFloor(){
        this.loadGeometrie();

    }*/

    public loadGeometrie(){
        this.floor.name = "floor";
        this.hoverFloor.name = "hoverFloor";

        const cubeGeometry = new THREE.BoxGeometry(1,2,1);
        const planeMaterial = new THREE.MeshStandardMaterial({ map: this.loader.load(this.texture)});

        let smallCubeMatr: THREE.Mesh[][];
        const smallCubeGeometry = new THREE.BoxGeometry(0.9,1,0.9);



        for (let x = 0; x < this.cube.floorSize.x; x += 1){
            for (let z = 0; z < this.cube.floorSize.y; z = z + 1){

                const cube = new THREE.Mesh( cubeGeometry, planeMaterial );
                cube.position.x = x;
                cube.position.z = z;
                cube.position.y = 0;
                cube.receiveShadow = true;
                cube.castShadow = false;
                cube.userData['ground'] = true;
                cube.userData['name'] = "ground";
                this.floor.add(cube);

                const smallCubeMaterial = new THREE.MeshStandardMaterial({
                    map: this.loader.load(this.texture2),
                    transparent: true,
                    opacity: 0.5
                });

                const smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterial);
                smallCube.position.x = x;
                smallCube.position.y = 1;
                smallCube.position.z = z;
                smallCube.receiveShadow = true;
                smallCube.userData['Case'] = true;
                smallCube.userData['Select'] = false;
                smallCube.name = `cube ${x}${z}`;
                this.hoverFloor.add(smallCube);
            }
        }
        this.scene.add(this.floor);
        this.scene.add(this.hoverFloor);
    }

    public removeFloor(){
        while (this.floor.children.length) {
            this.floor.remove(this.floor.children[0]);
            this.hoverFloor.remove(this.hoverFloor.children[0]);
        }


    }





    //ANIMATION

    public animationPerso(){

    }

    public deplacement(coordonne: Vector3){
        let componant: Scene = this;
        let DistanceX:number = Math.round((coordonne.x - this.obj.position.x)*100)/100;
        let DistanceZ:number = Math.round((coordonne.z - this.obj.position.z)*100)/100;
        let AvancerX:Boolean = DistanceX > 0;
        let AvancerZ:Boolean = DistanceZ > 0;
        this.isInMouvement = true;

        (function render() {
            if (DistanceX != 0 || DistanceZ != 0){
                requestAnimationFrame(render);
                DistanceX = Math.round((coordonne.x - componant.obj.position.x)*100)/100;
                DistanceZ = Math.round((coordonne.z - componant.obj.position.z)*100)/100;
                AvancerX = DistanceX > 0;
                AvancerZ = DistanceZ > 0;
            }
            else{
                componant.isInMouvement = false;
            }

            if (AvancerX && AvancerZ){
                componant.obj.position.x += 0.01;
                componant.obj.position.z += 0.01;
                componant.obj.lookAt(1000,0,1000);
            }else if (AvancerX && DistanceZ == 0){
                componant.obj.position.x += 0.01;
                componant.obj.lookAt(1000,0,0);
            }else if (AvancerX && !AvancerZ){
                componant.obj.position.x += 0.01;
                componant.obj.position.z -= 0.01;
                componant.obj.lookAt(1000,0,-1000);
            }else if(DistanceX == 0 && !AvancerZ){
                componant.obj.position.z -= 0.01;
                componant.obj.lookAt(0,0,-1000);
            }else if(!AvancerX && !AvancerZ && DistanceZ != 0){
                componant.obj.position.x -= 0.01;
                componant.obj.position.z -= 0.01;
                componant.obj.lookAt(-1000,0,-1000);
            }else if(!AvancerX && DistanceZ == 0 ){
                componant.obj.position.x -= 0.01;
                componant.obj.lookAt(-1000,0,0);
            }else if(!AvancerX && AvancerZ && DistanceX != 0){
                componant.obj.position.x -= 0.01;
                componant.obj.position.z += 0.01;
                componant.obj.lookAt(-1000,0,1000);
            }
            else if(DistanceX == 0 && AvancerZ){
                componant.obj.position.z += 0.01;
                componant.obj.lookAt(0,0,1000);
            }
        }())
    }


    //USER EVENT




    public getScene(): THREE.Scene{
        return this.scene;
    }

}