import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input} from '@angular/core';
import * as THREE from 'three';
import {CanvasTexture} from "three";
import {FlakesTexture} from "three/examples/jsm/textures/FlakesTexture";


@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit, AfterViewInit{
  @ViewChild('canvas')
  private canvasRef: ElementRef;
  @Input() public rotationSpeedX: number = 0.05;
  @Input() public rotationSpeedY: number = 0.1;
  @Input() public size: number = 200;
  @Input() public texture: string = "../assets/textures/texture.jpg";

  //Satge properties

  @Input() public cameraZ: number = 400;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane:number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;






  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement { return this.canvasRef.nativeElement;}
  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshBasicMaterial({ map: this.loader.load(this.texture)});
  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;


  private createScene() {
//* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000)
    this.scene.add(this.cube);
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
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  private startRenderingLoop() {
//* Renderer
// Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio (devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: CubeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.createScene();
    this.startRenderingLoop();
  }
}
