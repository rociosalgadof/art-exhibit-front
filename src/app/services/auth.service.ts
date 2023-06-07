import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly API_URL = "http://localhost:8888";
 
  constructor(private http: HttpClient) {}
 
  isAuthenticated(): boolean {
    // Get the token from the local storage
    const token: string | null = localStorage.getItem("authToken");
    // If not exist return false
    return token !== null;
  }
 
  authenticate(): Observable<User> {
    // Get the token from the local storage
    const storedToken: string | null = localStorage.getItem("authToken");
 
    if (storedToken === null) {
      throw null;
    }
 
    // Create the Authorization header
    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${storedToken}`,
      }),
    };
 
    // Get logged user information
    return this.http.get<User>(`${this.API_URL}/auth/verify`, options);
  }
 
  register(name: string, email: string, password: string): Observable<User> {
    const user: User = new User(null, name, email, password, [], null);
    // Register a new user
    return this.http.post<User>(`${this.API_URL}/auth/signup`, user);
  }
 
  login(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    };
    // Check credentials in the server
    return this.http.post<any>(`${this.API_URL}/auth/login`, body);
  }
 
  logout(): void {
    // Remove the token and the user information from local storage to log a user out
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("profileId");
  }
}
