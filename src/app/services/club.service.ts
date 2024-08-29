import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Club } from '../interfaces/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private jsonUrl = 'https://api.jsonbin.io/v3/b/66ce3c8ee41b4d34e4262b04';

  private headers = new HttpHeaders({
    'X-Master-Key': '$2a$10$NywB6goGByfUW/dxkd8l2eB5KBgfsze.eDO5n0ebByHPPTZzuyaBS'
  });

  constructor(
    private http: HttpClient
  ) { }

  getClubs(): Observable<Club[]> {
    return this.http.get<any>(this.jsonUrl, { headers: this.headers })
      .pipe(
        map(response => response.record) // Extrae el array de la propiedad `record`
      );
  }
}
