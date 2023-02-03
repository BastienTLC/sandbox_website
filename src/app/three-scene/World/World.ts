import * as THREE from 'three';
import {Experience} from "../Experience";
import {Camera} from "../Camera";
import {Sizes} from "../Utils/Sizes";
import {Scene} from "three";
import {Floor} from "./Floor";

export class World {
    private experience: Experience;
    private sizes: Sizes;
    private scene: Scene;
    private canvas: HTMLCanvasElement;

    private camera: Camera;
    private renderer!: THREE.WebGLRenderer;
    private floor: Floor;

    constructor() {
        this.experience = Experience.instance;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.floor = new Floor();

    }


    resize(){
    }

    update(){
    }
}