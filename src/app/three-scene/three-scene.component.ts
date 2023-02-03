import {Component, AfterViewInit, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Experience} from "./Experience";

@Component({
  selector: 'app-three-scene',
  templateUrl: './three-scene.component.html',
  styleUrls: ['./three-scene.component.css']
})
export class ThreeSceneComponent implements OnInit, AfterViewInit{
  @ViewChild('canvas')
  //private canvas = document.getElementById("canvas") as HTMLCanvasElement;
  private canvasRef!: ElementRef;
  private get canvas(): HTMLCanvasElement { return this.canvasRef.nativeElement;}
  //private exp : Experience = new Experience(this.canvas);


  ngOnInit() {
  }

  ngAfterViewInit() {
    const exp = new Experience(this.canvas);
  }


}
