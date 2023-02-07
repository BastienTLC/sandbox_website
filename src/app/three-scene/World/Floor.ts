import * as THREE from 'three';
import {Experience} from "../Experience";
import {Camera} from "../Camera";
import {Sizes} from "../Utils/Sizes";
import {Scene} from "three";
import {Resources} from "../Utils/Resources";
import { WorldDataService } from '../services/world-data.service';


export class Floor {
    private experience: Experience;
    private scene: Scene;
    public floor = new THREE.Group();
    private hoverFloor = new THREE.Group();
    public blocCourbe = new THREE.Group();
    private loader = new THREE.TextureLoader();
    private resources: Resources;
    private squareHoverTexture: string;
    private squareTexture: string;
    public catmulltab: THREE.CatmullRomCurve3[] = [];

    constructor(private floorDataService: WorldDataService) {
        this.experience = Experience.instance;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.squareTexture = this.resources.items["square"];
        this.squareHoverTexture = this.resources.items["squareHover"];
        this.createFloor();
        console.log(this.scene);
    }

    createFloor(){
        this.floor.name = "floor";
        this.hoverFloor.name = "hoverFloor";

        const cubeGeometry = new THREE.BoxGeometry(1,1,1);
        const planeMaterial = new THREE.MeshStandardMaterial({ map: this.loader.load(this.squareTexture)});

        const smallCubeGeometry = new THREE.BoxGeometry(0.9,0.2,0.9);

        let xmin = (0-this.floorDataService.floorSize.x/2)-0.5;
        let xmax = (this.floorDataService.floorSize.x/2)+0.5;
        let zmin = (0-this.floorDataService.floorSize.y/2)-0.5;
        let zmax = (this.floorDataService.floorSize.y/2)+0.5;
        let cubeDispertion = 2;

        for (let x = xmin; x < xmax; x += 1){
            for (let z = zmin; z < zmax; z = z + 1){

                const initCubePosition = new THREE.Vector3(
                    this.getRandomNumber(xmin*cubeDispertion,xmax*cubeDispertion),
                    this.getRandomNumber(xmin*cubeDispertion,xmax*cubeDispertion),
                    this.getRandomNumber(zmin*cubeDispertion, zmax*cubeDispertion));

                const curve = new THREE.CatmullRomCurve3(
                    [
                        initCubePosition,
                        new THREE.Vector3(x,0,z),
                    ]
                )
                this.catmulltab.push(curve);

                //Draw line
                // Create the final object to add to the scene
                const points = curve.getPoints( 50 );
                const geometry = new THREE.BufferGeometry().setFromPoints( points );
                const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );


                const curveObject = new THREE.Line( geometry, material );
                this.blocCourbe.add(curveObject);

                const cube = new THREE.Mesh( cubeGeometry, planeMaterial );
                cube.position.x = initCubePosition.x;
                cube.position.z = initCubePosition.y;
                cube.position.y = initCubePosition.z;
                cube.receiveShadow = true;
                cube.castShadow = false;
                cube.userData['ground'] = true;
                cube.userData['name'] = "ground";
                cube.userData['row'] = x;
                cube.name = `cube ${x}${z}`;
                cube.visible = true;
                this.floor.add(cube);

                const smallCubeMaterial = new THREE.MeshStandardMaterial({
                    map: this.loader.load(this.squareHoverTexture),
                    transparent: true,
                    opacity: 0.5
                });

                const smallCube = new THREE.Mesh(smallCubeGeometry, smallCubeMaterial);
                smallCube.position.x = x;
                smallCube.position.y = 1;
                smallCube.position.z = z;
                smallCube.receiveShadow = true;
                smallCube.userData['case'] = true;
                smallCube.userData['select'] = false;
                smallCube.name = `cube ${x}${z}`;
                smallCube.visible = false;
                this.hoverFloor.add(smallCube);
            }
        }
        //this.scene.add(this.blocCourbe);
        this.scene.add(this.floor);
        this.scene.add(this.hoverFloor);
    }

    getRandomNumber(min:number, max:number) {
        return Math.random() * (max - min) + min;
    }


    resize(){
    }

    update(){
    }
}