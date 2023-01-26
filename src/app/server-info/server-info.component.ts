import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {ServerDataService} from "./server-data.service";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;
import {ServerDataMemoryModel} from "./DataModel/ServerDataMemory.model";
import {Cpu} from "../interfaces/RootObject";

@Component({
  selector: 'app-server-info',
  templateUrl: './server-info.component.html',
  styleUrls: ['./server-info.component.css']
})
export class ServerInfoComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private serveurData: ServerDataService) {}

  memoryInterval:any;
  usedvalue: number | undefined;
  freevalue: number | undefined;
  cpuLoad: Cpu[] | undefined;

  ngOnInit() {
    this.memoryInterval = setInterval(()=> {
      this.serveurData.getMemory().subscribe(data => {
        //console.log(data);
        this.usedvalue = Math.round(data.usedMemory);
        this.freevalue = Math.round(data.freeMemory);
        //this.usedvalue = (data.usedMemory/data.totalMemory) * 100;
      });


      this.serveurData.getCpus().subscribe(data => {
        //console.log(data.cpuInfo.cpus);
        this.cpuLoad = data.cpuInfo.cpus;
      });
    },1000);
  }

  ngOnDestroy() {
    clearInterval(this.memoryInterval);
  }

}
