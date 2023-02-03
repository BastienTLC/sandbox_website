import * as THREE from 'three';
import {Experience} from "../Experience";
import {Camera} from "../Camera";
import {Sizes} from "../Utils/Sizes";
import {Scene} from "three";

export class Floor {
    private experience: Experience;
    private scene: Scene;

    constructor() {
        this.experience = Experience.instance;
        this.scene = this.experience.scene;

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

    }


    resize(){
    }

    update(){
    }
}