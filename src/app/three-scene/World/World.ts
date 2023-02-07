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
import {WorldDataService} from "../services/world-data.service";
import {Controls} from "./Controls";

export class World {
    private experience: Experience;
    private sizes: Sizes;
    private scene: Scene;
    private canvas: HTMLCanvasElement;

    private camera: Camera;
    private renderer!: THREE.WebGLRenderer;
    floor!: Floor;
    private resources: Resources;
    private character!: Character;
    private environment!: Environment;
    private controls!: Controls;

    constructor(private floorDataService: WorldDataService) {
        this.experience = Experience.instance;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = new Resources(assets);

        this.resources.on("ready", () =>{
            this.environment = new Environment();
            this.character = new Character();
            this.floor = new Floor(floorDataService);
            this.controls = new Controls();
        })
    }

    generateFloor(){
        this.floor.createFloor();
    }



    resize(){
    }

    update(){
        if (this.character){
            this.character.update();
        }

        if (this.floor){
            this.floor.update();
        }
        if (this.controls){
            this.controls.update();
        }
    }
}