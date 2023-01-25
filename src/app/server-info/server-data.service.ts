import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {ServerDataModel} from "./ServerData.model";

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {

  constructor(private http: HttpClient) {}

  getMemory():Observable<ServerDataModel> {
    return this.http.get<ServerDataModel>('http://bastientlc.freeboxos.fr:32769/memory');
  }

  getCpus(){
    return this.http.get('http://bastientlc.freeboxos.fr:32769/cpu');
  }
}
