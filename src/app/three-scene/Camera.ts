import * as THREE from 'three';
import {Experience} from "./Experience";
import {CameraHelper, Scene} from "three";
import {Sizes} from "./Utils/Sizes";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export class Camera{
    private experience: Experience;
    private sizes: Sizes;
    private scene: Scene;
    private canvas: HTMLCanvasElement;
    perspectiveCamera!: THREE.PerspectiveCamera;
    travelPerspectiveCamera!: THREE.PerspectiveCamera;
    orbiteCamera!: OrbitControls;
    orthographicCamera!: THREE.OrthographicCamera;

    private helper!: CameraHelper;
    constructor() {
        this.experience = Experience.instance;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createTravelPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControl();

    }
    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.set(-0.45,10.5,31);
    }

    createTravelPerspectiveCamera(){
        this.travelPerspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.travelPerspectiveCamera);
        this.travelPerspectiveCamera.position.set(-0.45,10.5,31);
    }

    setOrbitControl(){
        this.orbiteCamera= new OrbitControls(this.perspectiveCamera, this.canvas);
        this.orbiteCamera.enableDamping = true;
        this.orbiteCamera.enableZoom = false;
    }

    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -20,
            20
        );
        this.scene.add(this.orthographicCamera);

        const size = 20;
        const division = 20;
        const gridHelper = new THREE.GridHelper(size,division);
        gridHelper.position.set(0,0,0);
        this.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(10);
        this.scene.add(axesHelper);

        this.helper = new THREE.CameraHelper(this.orthographicCamera);
        this.scene.add(this.helper);
    }

    resize(){
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
        console.log("resize");

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2;
        this.orthographicCamera.top = this.sizes.frustrum/2;
        this.orthographicCamera.bottom = -this.sizes.frustrum/2;
    }

    update(){
        this.orbiteCamera.update();
        this.helper.matrixWorldNeedsUpdate = true;
        this.helper.update();
        this.helper.position.copy(this.orthographicCamera.position);
        this.helper.rotation.copy(this.orthographicCamera.rotation);
    }
}
