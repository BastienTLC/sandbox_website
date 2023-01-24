import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {VilleModel} from "./ville.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VillleService {

  constructor(private http: HttpClient) { }

  getVilleResult(): Observable<VilleModel> {
    return this.http.get<VilleModel>('assets/json/ville.json');
  }

}
