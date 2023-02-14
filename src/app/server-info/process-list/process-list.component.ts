import { Component, OnInit } from '@angular/core';
import {ServerDataService} from "../server-data.service";
import {Process} from "../../interfaces/Process";

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit {

  processList!: Process[];
  sortProcessList!: Process[];
  ascending = true;


  constructor(private serveurData: ServerDataService) {
  }

  orderByPid(){
    this.sortProcessList = this.processList.sort((a, b) =>
        this.ascending ? parseInt(a.pid) -parseInt(b.pid) : parseInt(b.pid) -parseInt(a.pid));
    this.ascending = this.ascending === true ? false : true;
  }
  orderByName(){
    this.sortProcessList = this.processList.sort((a, b)=>
        this.ascending ? a.user.localeCompare(b.user) : b.user.localeCompare(a.user));
    this.ascending = this.ascending === true ? false : true;
  }

  orderByCpu(){
    this.sortProcessList = this.processList.sort((a, b) =>
        this.ascending ? parseFloat(a.cpu) -parseFloat(b.cpu) : parseFloat(b.cpu) -parseFloat(a.cpu));
    this.ascending = this.ascending === true ? false : true;
  }

  orderByRam(){
    this.sortProcessList = this.processList.sort((a, b) =>
        this.ascending ? parseFloat(a.mem) -parseFloat(b.mem) : parseFloat(b.mem) -parseFloat(a.mem));
    this.ascending = this.ascending === true ? false : true;
  }

  orderByTime(){
    this.sortProcessList = this.processList.sort((a, b) =>
        this.ascending ? parseFloat(a.time) -parseFloat(b.time) : parseFloat(b.time) -parseFloat(a.time));
    this.ascending = this.ascending === true ? false : true;
  }

  ngOnInit() {
    this.serveurData.getProcess().subscribe(data => {
      this.processList = data;
    })
  }
}
