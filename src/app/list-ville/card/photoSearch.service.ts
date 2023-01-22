import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PhotoSearchService {

    constructor(private http: HttpClient) { }

    search(keyword: string): Observable<any> {
        const url = `https://pixabay.com/api/?key=33025791-c1d051670f553e47c0bd5a3a2&q=${keyword}&image_type=photo&per_page=3`;
        return this.http.get(url);
    }
}
