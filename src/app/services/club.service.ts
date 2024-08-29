import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from '../interfaces/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private jsonUrl = 'assets/universal-club-list.json';

  constructor(
    private http: HttpClient
  ) { }

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.jsonUrl);

  }
}
