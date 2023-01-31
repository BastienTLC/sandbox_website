import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, HostListener} from '@angular/core';
import * as THREE from 'three';
import {CanvasTexture, Mesh, Object3D} from "three";
import {FlakesTexture} from "three/examples/jsm/textures/FlakesTexture";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {animate} from "@angular/animations";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Scene} from "./Scene";



@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit, AfterViewInit{
  @ViewChild('canvas')


  private canvasRef!: ElementRef;
  @Input() public rotationSpeedX: number = 0.005;
  @Input() public rotationSpeedY: number = 0.005;
  @Input() public size: number = 200;
  @Input() public texture: string = "../../assets/textures/texture.jpg";

  @Input() public cameraZ: number = 1000;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane:number = 1;
  @Input('farClipping') public farClippingPlane: number = 5000;


  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement { return this.canvasRef.nativeElement;}

  private renderer!: THREE.WebGLRenderer;
  private Scene: Scene = new Scene();


  private createCamera() {

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE. PerspectiveCamera(
        this.fieldOfView,
        aspectRatio,
        this.nearClippingPlane,
        this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
    this.camera.position.y = 2000;
  }


  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private  animateCube(){
    /*this.obj.rotation.y += this.rotationSpeedY;
    this.obj.rotation.x += this.rotationSpeedX;*/
  }

  private startRenderingLoop() {
//* Renderer
// Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio (devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: CubeComponent = this;
    const control = new OrbitControls(this.camera, this.renderer.domElement);
    control.update();
    (function render() {
      requestAnimationFrame(render);
      component.Scene.animationCube();
      component.renderer.render(component.Scene.getScene(), component.camera);
    }());
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    this.Scene.createScene();
    //this.scene = this.sc.getScene();
    this.createCamera();
    this.startRenderingLoop();

    window.addEventListener('resize', event=>{

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( this.canvas.width, this.canvas.height );
    });



    this.canvas.addEventListener( 'pointermove', event =>{

      pointer.x = ( event.clientX / this.canvas.clientWidth ) * 2 - 1;
      pointer.y = - ( event.clientY / this.canvas.clientHeight ) * 2 + 1;

      raycaster.setFromCamera(pointer,this.camera);
      const found = raycaster.intersectObjects(this.Scene.getScene().children);

      if (found.length > 0 && found[0].object.userData['Case']){
        (((found[0].object as THREE.Mesh).material) as THREE.Material).opacity = 1;
      }

    } );
  }

}
