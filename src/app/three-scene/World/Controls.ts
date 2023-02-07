import {Experience} from "../Experience";
import {CatmullRomCurve3, EllipseCurve, Scene, Vector3} from "three";
import * as THREE from 'three';
import {Resources} from "../Utils/Resources";
import {Time} from "../Utils/Time";
import {Camera} from "../Camera";
import GSAP from "gsap"
import {Floor} from "./Floor";

export class Controls{
    private experience: Experience;
    private scene: Scene;
    private resources: Resources;
    private character: any;
    private focusCharacter: any;
    private time: Time;
    private curve!: CatmullRomCurve3;
    private camera: Camera;
    private progress: number;
    private position = new THREE.Vector3(0, 0 ,0);
    private lookAtPosition = new THREE.Vector3(0, 0 ,0);
    private directionalVector = new THREE.Vector3(0, 0 ,0);
    private staticVector = new THREE.Vector3(0, -1 ,0);
    private crossVector = new THREE.Vector3(0, 0 ,0);
    private lerp: { ease: number; current: number; target: number };
    private floor: Floor;

    constructor() {
        this.experience = Experience.instance;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.floor = this.experience.world.floor;

        this.progress = 0;
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        };

        //GSAP.registerPlugin(ScrollTrigger);

        this.setPath();
        this.onWheel();

    }




    setPath(){
        //Create a closed wavey loop
        this.curve = new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(0,30,0),
                new THREE.Vector3(0,5,15),
                new THREE.Vector3(15,15,15),

            ]
        )

        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

        // Create the final object to add to the scene
        const curveObject = new THREE.Line( geometry, material );
        this.scene.add(curveObject);

    }

    onWheel(){
        window.addEventListener("wheel", (e) => {
            console.log(e);
            if (e.deltaY > 0){
                this.lerp.target += 0.1;
            }else{
                this.lerp.target -= 0.1;
            }
        })
    }

    resize(){
    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.curve.getPointAt(this.lerp.current % 1, this.position);
        this.camera.travelPerspectiveCamera.position.copy(this.position);

        this.directionalVector.subVectors(this.curve.getPointAt((this.lerp.current%1)+0.000001), this.position);

        this.directionalVector.normalize();
        this.crossVector.crossVectors(
            this.directionalVector,
            this.staticVector
        )
        this.crossVector.multiplyScalar(100000);
        this.camera.travelPerspectiveCamera.lookAt(0,0,0);

    }
}