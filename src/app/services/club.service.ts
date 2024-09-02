import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from '../interfaces/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private CLUB_URL = 'assets/universal-club-list.json';

  private NT_URL = 'assets/national-teams-list.json';

  constructor(
    private http: HttpClient
  ) { }

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.CLUB_URL);
  };

  getNT(): Observable<Club[]> {
    return this.http.get<Club[]>(this.NT_URL);
  }

}
