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
    private loader = new THREE.TextureLoader();
    private resources: Resources;
    private squareHoverTexture: string;
    private squareTexture: string;

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

        const cubeGeometry = new THREE.BoxGeometry(1,2,1);
        const planeMaterial = new THREE.MeshStandardMaterial({ map: this.loader.load(this.squareTexture)});


        const smallCubeGeometry = new THREE.BoxGeometry(0.9,0.2,0.9);



        for (let x = (0-this.floorDataService.floorSize.x/2)-0.5; x < (this.floorDataService.floorSize.x/2)+0.5; x += 1){
            for (let z = (0-this.floorDataService.floorSize.y/2)-0.5; z < (this.floorDataService.floorSize.y/2)+0.5; z = z + 1){

                const cube = new THREE.Mesh( cubeGeometry, planeMaterial );
                cube.position.x = x;
                cube.position.z = z;
                cube.position.y = 0;
                cube.receiveShadow = true;
                cube.castShadow = false;
                cube.userData['ground'] = true;
                cube.userData['name'] = "ground";
                cube.userData['row'] = x;
                cube.name = `cube ${x}${z}`;
                cube.visible = false;
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
        this.scene.add(this.floor);
        this.scene.add(this.hoverFloor);
    }


    resize(){
    }

    update(){
    }
}