import * as THREE from 'three';
import {Sizes} from "./Utils/Sizes";
import {Scene} from "three";
import {canvas} from "chart.js/helpers";
import {Camera} from "./Camera";
import {Renderer} from "./Renderer";
import {Time} from "./Utils/Time";
import assets from "./Utils/assets"

import {World} from "./World/World";
import {Resources} from "./Utils/Resources";
import {WorldDataService} from "./services/world-data.service";

export class Experience{
    static instance: Experience;

    canvas!: HTMLCanvasElement;
    sizes!: Sizes;
    scene!: Scene;
    camera!: Camera;
    renderer!: Renderer;
    time!: Time;
    world!: World;
    resources!: Resources;

    constructor(canvas:HTMLCanvasElement,private floorDataService: WorldDataService) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;

        this.canvas = canvas
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World(floorDataService);


        this.time.on("update", ()=>{
            this.update();
        })
        this.time.on("resize", ()=>{
            this.resize();
        })

    }

    resize(){
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }

    update(){
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

}