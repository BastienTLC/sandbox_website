import { Component, OnInit } from '@angular/core';
import { VillleService } from "./villle.service";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-ville',
  templateUrl: './list-ville.component.html',
  styleUrls: ['./list-ville.component.css'],
})
export class ListVilleComponent{
  jsonVilleResult: any;

  constructor(private http: HttpClient, private VilleService: VillleService) {
    this.http.get('assets/json/ville.json').subscribe((res) => {
      this.jsonVilleResult = res;
      console.log('--- result :: ',  this.jsonVilleResult);
      console.log('___ result :: ',  this.VilleService.getVilleResult());
    });
  }
}
