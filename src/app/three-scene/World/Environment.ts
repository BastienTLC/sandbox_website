import {Experience} from "../Experience";
import {DirectionalLight, Scene} from "three";
import * as THREE from 'three';
import {Resources} from "../Utils/Resources";

export class Environment {
    private experience: Experience;
    private scene: Scene;
    private focusCharacter: any;
    private sunLight!: DirectionalLight;

    constructor() {
        this.experience = Experience.instance;
        this.scene = this.experience.scene;
        this.setSunLight();

    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(1024,1024);
        this.sunLight.position.set(2,7,3);
        this.scene.add(this.sunLight);
    }


    resize(){
    }

    update(){
    }
}