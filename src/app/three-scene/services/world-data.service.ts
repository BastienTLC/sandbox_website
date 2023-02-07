import {Injectable, Input} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorldDataService {
  @Input() public floorSize: { x: number; y: number } = {x: 10, y: 10};

  constructor() {

  }
}