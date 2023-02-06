import {Experience} from "../Experience";
import {Scene} from "three";
import * as THREE from 'three';
import {Resources} from "../Utils/Resources";

export class Character {
    private experience: Experience;
    private scene: Scene;
    private resources: Resources;
    private character: any;
    private focusCharacter: any;

    constructor() {
        this.experience = Experience.instance;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.character = this.resources.items["character"];
        this.focusCharacter = this.character.scene;

        this.setModel();

    }

    setModel(){
        this.scene.add(this.focusCharacter);
    }

    Rotate(){
        this.focusCharacter.rotation.x += 0.1;
    }


    resize(){
    }

    update(){
    }
}