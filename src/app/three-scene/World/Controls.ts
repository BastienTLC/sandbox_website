import {Experience} from "../Experience";
import {CatmullRomCurve3, EllipseCurve, Scene, Vector3} from "three";
import * as THREE from 'three';
import {Resources} from "../Utils/Resources";
import {Time} from "../Utils/Time";
import {Camera} from "../Camera";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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
            ease: 0.03
        };

        gsap.registerPlugin(ScrollTrigger);

        this.setPath();
        this.onWheel();

    }


    /*setScrollTrigger() {
        ScrollTrigger.matchMedia({
            all: () => {
                this.floor.floor.children.forEach((value,index) =>{
                    console.log(value);
                    value.visible = true;
                    gsap.to(value.position,{
                        y:0.5,
                        duration:(index + 1)*0.005,
                        onComplete: () => {
                            gsap.to(value.position, {
                                y: 0,
                                duration: (index + 1)*0.005,
                            });
                        }
                    })
                })
            }
        });
    }*/
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
            console.log(this.lerp.current.toFixed(3))
            console.log(this.lerp.target.toFixed(3))
            if (e.deltaY > 0){
                this.lerp.target += 0.1;
                //this.setScrollTrigger();
            }else{
                this.lerp.target -= 0.1;
            }
            console.log(Math.abs(this.lerp.target - this.lerp.current)>=1);
            if (this.lerp.current.toFixed(3) == this.lerp.target.toFixed(3)) {
                console.log("clock");
            }
        })
    }

    resize(){
    }

    update(){
        this.lerp.current = gsap.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.lerp.current = gsap.utils.clamp(0,0.99999,this.lerp.current);
        this.lerp.target = gsap.utils.clamp(0,0.99999, this.lerp.target);

        this.floor.catmulltab.forEach((value, index)=>{
            const lerpPosition = new THREE.Vector3(0, 0 ,0);
            value.getPointAt(this.lerp.current %1, lerpPosition);
            this.floor.floor.children[index].position.copy(lerpPosition);
        })


        this.curve.getPointAt(this.lerp.current % 1, this.position);
        this.camera.travelPerspectiveCamera.position.copy(this.position);

        this.camera.travelPerspectiveCamera.lookAt(0,0,0);

    }
}