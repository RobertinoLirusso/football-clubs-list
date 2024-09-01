import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Club } from '../interfaces/club';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private CLUB_URL = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.CLUB_URL);

  }
}
