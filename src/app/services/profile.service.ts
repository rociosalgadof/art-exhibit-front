import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { ProfileInterface } from '../interfaces/profile-inteface';

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
}
