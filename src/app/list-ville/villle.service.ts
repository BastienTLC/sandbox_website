import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {VilleModel} from "./ville.model";

@Injectable({
  providedIn: 'root'
})
export class VillleService {

  jsonVilleResult: any;

  constructor(private http: HttpClient) {
    this.http.get('assets/json/ville.json').subscribe((res) => {
      this.jsonVilleResult = res;
    });
  }

  getVilleResult(): VilleModel[]{
    this.http.get('assets/json/ville.json').subscribe((res) => {
      this.jsonVilleResult = res;
    });
    console.log('|||| result :: ',  this.jsonVilleResult);
    return this.jsonVilleResult;
  }

}
