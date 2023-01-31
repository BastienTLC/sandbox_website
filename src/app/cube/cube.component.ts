import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, HostListener} from '@angular/core';
import * as THREE from 'three';
import {CanvasTexture, Object3D} from "three";
import {FlakesTexture} from "three/examples/jsm/textures/FlakesTexture";
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {animate} from "@angular/animations";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


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

  @Input() public cameraZ: number = 200;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane:number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;


  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement { return this.canvasRef.nativeElement;}
  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private light = new THREE.DirectionalLight(0xffffff,1);
  private ligntAmb = new THREE.DirectionalLight(0xffffff, 1)
  private import = new GLTFLoader();
  private obj:Object3D = new THREE.Object3D;


  private material = new THREE.MeshBasicMaterial({ map: this.loader.load(this.texture)});
  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  //private controls = new OrbitControls(this.camera, this.renderer.domElement);

  private createScene() {
//* Scene
    this.light.position.set(2,2,5);
    this.scene = new THREE.Scene();
    //this.scene.background = new THREE.Color(0x0000FF);
    //this.scene.add(this.cube);
    this.import.load('../../assets/3D/character_rogue.gltf', (gltf) =>{
       this.obj = gltf.scene.children[0];
      this.scene.add(this.obj);
    }, undefined, function (error){
      console.error(error);
    });

    this.scene.add(this.ligntAmb);
    this.scene.add(this.light);

//*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE. PerspectiveCamera(
        this.fieldOfView,
        aspectRatio,
        this.nearClippingPlane,
        this.farClippingPlane
    )
   this.camera.position.z = this.cameraZ;
  }


  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private  animateCube(){
    this.obj.rotation.y += this.rotationSpeedY;
    this.obj.rotation.x += this.rotationSpeedX;
  }

  private startRenderingLoop() {
//* Renderer
// Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });
    this.renderer.setPixelRatio (devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: CubeComponent = this;
    const control = new OrbitControls(this.camera, this.renderer.domElement);
    control.update();
    (function render() {
      requestAnimationFrame(render);
      //component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }


  ngOnInit() {
  }

  ngAfterViewInit() {

    this.createScene();
    this.startRenderingLoop();
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event : WindowEventMap) {
    console.log("scroll");
  }
}
