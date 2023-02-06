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



    }


    resize(){
    }

    update(){
    }
}