import * as THREE from 'three';
import {Experience} from "./Experience";
import {Scene} from "three";
import {Sizes} from "./Utils/Sizes";

export class Camera{
    private experience: Experience;
    private sizes: Sizes;
    private scene: Scene;
    private canvas: HTMLCanvasElement;
    perspectiveCamera!: THREE.PerspectiveCamera;
    private orthographicCamera!: THREE.OrthographicCamera;
    constructor() {
        this.experience = Experience.instance;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();

    }
    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 5;
    }

    private createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -100,
            100
        );
        this.scene.add(this.orthographicCamera);
    }

    resize(){
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = -this.sizes.frustrum/2;
    }

    update(){

    }
}
