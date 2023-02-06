import * as THREE from 'three';
import {Experience} from "../Experience";
import {Camera} from "../Camera";
import {Sizes} from "../Utils/Sizes";
import {Scene} from "three";
import {Floor} from "./Floor";
import assets from "../Utils/assets";
import {Resources} from "../Utils/Resources";
import {Character} from "./character";
import {Environment} from "./Environment";

export class World {
    private experience: Experience;
    private sizes: Sizes;
    private scene: Scene;
    private canvas: HTMLCanvasElement;

    private camera: Camera;
    private renderer!: THREE.WebGLRenderer;
    private floor!: Floor;
    private resources: Resources;
    private character!: Character;
    private environment!: Environment;

    constructor() {
        this.experience = Experience.instance;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = new Resources(assets);

        this.resources.on("ready", () =>{
            this.environment = new Environment();
            //this.floor = new Floor();
            this.character = new Character();
        })
    }


    resize(){
    }

    update(){
        if (this.character){
            this.character.update();
        }
    }
}