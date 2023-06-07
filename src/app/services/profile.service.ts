import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { ProfileInterface } from '../interfaces/profile-inteface';
import { HttpHeaders } from '@angular/common/http';
import { EnquiryInterface } from '../interfaces/enquiry-interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profile!: ProfileInterface;

  private readonly API_URL = "http://localhost:8888/api";

  constructor(private http: HttpClient) { }

  getProfile(id: number):Observable<any> {
    return this.http.get<any>(`${this.API_URL}/profile/${id}`);
  }

  editProfile(id: number, body: ProfileInterface): Observable<any> {
    const options = {
      headers: this.getAuthHeader(),
    };
    return this.http.put<any>(`${this.API_URL}/profile/${id}/edit`, body, options);
  }

  createEnquiry(id: number, body: EnquiryInterface): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/profile/${id}/enquiry`, body);
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
