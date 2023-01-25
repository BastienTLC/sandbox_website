import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerDataService {

  constructor(private http: HttpClient) {}

  getMemory() {
    return this.http.get('http://bastientlc.freeboxos.fr:32769/memory');
  }
}
