import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module'
import {Scene} from "./Scene";


@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit, AfterViewInit, OnChanges{
  @ViewChild('canvas')


  private canvasRef!: ElementRef;
  @Input() public rotationSpeedX: number = 0.005;
  @Input() public rotationSpeedY: number = 0.005;
  @Input() public size: number = 200;
  @Input() public texture: string = "../../assets/textures/texture.jpg";
  @Input() public loading: boolean = false;

  @Input() public cameraZ: number = 1000;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane:number = 100;
  @Input('farClipping') public farClippingPlane: number = 200000;

  @Input() public floorSize: { x: number; y: number } = {x: 1, y: 1};


  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement { return this.canvasRef.nativeElement;}

  private renderer!: THREE.WebGLRenderer;
  private Scene: Scene = new Scene(this);


  private createCamera() {

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE. PerspectiveCamera(
        this.fieldOfView,
        aspectRatio,
        this.nearClippingPlane,
        this.farClippingPlane
    )
    this.camera.position.z = 0;
    this.camera.position.x = 0;
    this.camera.position.y = 1000;
    this.camera.rotation.x = 30;

  }


  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private  animateCube(){
    /*this.obj.rotation.y += this.rotationSpeedY;
    this.obj.rotation.x += this.rotationSpeedX;*/
  }

  private startRenderingLoop() {

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

  listenerEvent(){
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    window.addEventListener('resize', event=>{

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize( this.canvas.width, this.canvas.height );
    });

    this.canvas.addEventListener( 'mousemove', event =>{
      pointer.x = ( event.clientX / this.canvas.clientWidth ) * 2 - 1;
      pointer.y = - ( event.clientY / this.canvas.clientHeight ) * 2 + 1;

      raycaster.setFromCamera(pointer,this.camera);
      const found = raycaster.intersectObjects(this.Scene.getScene().children);


      if (found.length > 0 && found[0].object.userData['Case']){
        (((found[0].object as THREE.Mesh).material) as THREE.Material).opacity = 1;
      }
      else {
        this.Scene.getScene().children.forEach((value)=>{
          const group = value.getObjectByName('hoverFloor') as THREE.Group;
          if (group as THREE.Group){
            group.children.forEach(itemInGroup => {
              if (itemInGroup.userData['Case']){
                (((itemInGroup as THREE.Mesh).material) as THREE.Material).opacity = 0.10
              }
            })
          }
        })
      }
    });

    this.canvas.addEventListener('click', event => {
      pointer.x = ( event.clientX / this.canvas.clientWidth ) * 2 - 1;
      pointer.y = - ( event.clientY / this.canvas.clientHeight ) * 2 + 1;
      raycaster.setFromCamera(pointer,this.camera);
      const found = raycaster.intersectObjects(this.Scene.getScene().children);

      if(found.length > 0 ){
        (found[0].object as THREE.Mesh).userData['Select'] = true;
        (found[0].object as THREE.Mesh).userData['Case'] = false;
        (((found[0].object as THREE.Mesh).material) as THREE.Material).opacity = 1;
      }
    });

  }


  ngOnInit() {
  }

  onValueChange(newValue: any) {
    this.loading = true;
    this.Scene.removeFloor();
    this.Scene.loadGeometrie();
    console.log(this.Scene.getScene());

    //this.camera.position.z ++;
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(this.cameraZ);
  }

  ngAfterViewInit() {
    this.Scene.createScene();
    this.createCamera();
    this.startRenderingLoop();
    this.listenerEvent();
  }

  onChanges(){
    console.log("changes");
  }


}
