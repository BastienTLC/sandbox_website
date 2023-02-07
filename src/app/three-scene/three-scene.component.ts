import {Component, AfterViewInit, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import {Experience} from "./Experience";
import { WorldDataService } from './services/world-data.service';

@Component({
  selector: 'app-three-scene',
  templateUrl: './three-scene.component.html',
  styleUrls: ['./three-scene.component.css']
})
export class ThreeSceneComponent implements OnInit, AfterViewInit{
  @ViewChild('canvas')

  private canvasRef!: ElementRef;
  private get canvas(): HTMLCanvasElement { return this.canvasRef.nativeElement;}
  @Input() public floorSize: { x: number; y: number } = {x: 10, y: 10};
  private exp!: Experience;

  constructor(private floorDataService: WorldDataService) {
  }

  onValueChange(newValue: any) {
    this.floorDataService.floorSize = this.floorSize;
    //this.exp.world.generateFloor();
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    this.exp = new Experience(this.canvas,this.floorDataService);
  }


}
