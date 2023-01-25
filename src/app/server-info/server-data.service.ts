import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {ServerDataMemoryModel} from "./DataModel/ServerDataMemory.model";
import { RootObject } from '../interfaces/RootObject';


@Injectable({
  providedIn: 'root'
})
export class ServerDataService {

  constructor(private http: HttpClient) {}

  getMemory():Observable<ServerDataMemoryModel> {
    return this.http.get<ServerDataMemoryModel>('http://bastientlc.freeboxos.fr:32769/memory');
  }

  getCpus():Observable<RootObject>{
    return this.http.get<RootObject>('http://bastientlc.freeboxos.fr:32769/cpu');
  }
}
