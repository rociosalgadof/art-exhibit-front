import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { ProfileInterface } from '../interfaces/profile-inteface';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profile!: ProfileInterface;

  private readonly API_URL = "http://localhost:8888/api";

  constructor(private http: HttpClient) { }

  getProfile():Observable<any> {
    return this.http.get<any>(`${this.API_URL}/profile/1`);
  }

  private getAuthHeader(): HttpHeaders {
    // Get the token from the local storage
    const token: string | null = localStorage.getItem("authToken");
    if (token === null) {
      throw null;
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
