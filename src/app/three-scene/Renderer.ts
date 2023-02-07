import * as THREE from 'three';
import {Experience} from "./Experience";
import {Scene} from "three";
import {Sizes} from "./Utils/Sizes";
import {Camera} from "./Camera";

export class Renderer {
    private experience: Experience;
    private sizes: Sizes;
    private scene: Scene;
    private canvas: HTMLCanvasElement;
    private perspectiveCamera!: THREE.PerspectiveCamera;
    private orthographicCamera!: THREE.OrthographicCamera;
    private camera: Camera;
    private renderer!: THREE.WebGLRenderer;

    constructor() {
        this.experience = Experience.instance;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        console.log(this.camera, this.perspectiveCamera);

        this.setRenderer();
    }

    setRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update(){
        this.renderer.setViewport(0,0,this.sizes.width, this.sizes.height);
        this.renderer.render(this.scene,this.camera.travelPerspectiveCamera);

        this.renderer.setScissorTest(true);
        this.renderer.setViewport(
            this.sizes.width - this.sizes.width /3,
            this.sizes.height - this.sizes.height /3,
            this.sizes.width / 3,
            this.sizes.height / 3
        );
        this.renderer.setScissor(
            this.sizes.width - this.sizes.width /3,
            this.sizes.height - this.sizes.height /3,
            this.sizes.width / 3,
            this.sizes.height / 3
        )
        this.renderer.render(this.scene, this.camera.perspectiveCamera)

        this.renderer.setScissorTest(false);
    }
}