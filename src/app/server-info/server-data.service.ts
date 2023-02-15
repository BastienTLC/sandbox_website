import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {ServerDataMemoryModel} from "./DataModel/ServerDataMemory.model";
import { RootObject } from '../interfaces/RootObject';
import {SystemInfo} from "../interfaces/system-info";
import {Process} from "../interfaces/Process";


@Injectable({
  providedIn: 'root'
})


export class ServerDataService {
  private domaine : string;

  constructor(private http: HttpClient) {
    this.domaine = 'http://bastientlc.freeboxos.fr:32769/';
  }

  getMemory():Observable<ServerDataMemoryModel> {
    return this.http.get<ServerDataMemoryModel>(this.domaine+'memory');
  }

  getCpus():Observable<RootObject>{
    return this.http.get<RootObject>(this.domaine+'cpu');
  }

  getSystem():Observable<SystemInfo>{
    return this.http.get<SystemInfo>(this.domaine+'sysinfo');
  }

  getProcess(): Observable<Process[]>{
    return this.http.get<Process[]>(this.domaine+'process');
  }


  pauseProcess(pid: string, pwd: string) {
    const pidSend = parseInt(pid);
    const body = { pwd: pwd };
    return this.http.post(this.domaine + 'process/pause/' + pid, {body});
  }


}
