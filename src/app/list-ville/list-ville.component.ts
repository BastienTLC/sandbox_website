import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-ville',
  templateUrl: './list-ville.component.html',
  styleUrls: ['./list-ville.component.css'],
})
export class ListVilleComponent {
  jsonVilleResult: any;

  constructor(private http: HttpClient) {
    this.http.get('assets/json/ville.json').subscribe((res) => {
      this.jsonVilleResult = res;
      console.log('--- result :: ',  this.jsonVilleResult);
    });
  }


}
