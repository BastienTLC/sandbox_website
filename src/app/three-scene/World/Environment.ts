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
        //this.setAmbientLight();

    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff", 1);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(1024,1024);
        this.sunLight.position.set(40,40,40);
        this.scene.add(this.sunLight);
    }

    setAmbientLight(){
        let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
    }



    resize(){
    }

    update(){
    }
}