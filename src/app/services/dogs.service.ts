import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogsService {

  constructor(private http: HttpClient) { }
  getRandomPics(): Observable<any> {

    return this.http.get("https://dog.ceo/api/breeds/image/random/5", {});
  }

  getAllBreeds(): Observable<any> {
    return this.http.get("https://dog.ceo/api/breeds/list/all", {});
  }
  getRandomPicsForBreed(breed): Observable<any> {
    return this.http.get(
      'https://dog.ceo/api/breed/' + breed + '/images/random/5', {});
  }
}
