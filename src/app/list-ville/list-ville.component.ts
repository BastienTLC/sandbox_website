import { Component, OnInit } from '@angular/core';
import { VillleService } from "./villle.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-ville',
  templateUrl: './list-ville.component.html',
  styleUrls: ['./list-ville.component.css'],
})
export class ListVilleComponent implements OnInit{
  jsonVilleResult: any;

  constructor(private VilleService: VillleService) { }

  ngOnInit() {
    this.VilleService.getVilleResult().subscribe(res => {
      this.jsonVilleResult = res;
    });
  }
}
