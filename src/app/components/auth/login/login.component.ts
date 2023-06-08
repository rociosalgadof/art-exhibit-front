import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../contact/contact.component.css', '../../home/home.component.css']
})
export class LoginComponent implements OnInit{
  externalErrorMsg: string;
  loginForm: FormGroup;
  emailInput: FormControl;
  passwordInput: FormControl;
 
  constructor(private router: Router, private authService: AuthService) {
    this.emailInput = new FormControl("", [
      Validators.required,
      Validators.email,
    ]);
    this.passwordInput = new FormControl("", [Validators.required]);
    this.loginForm = new FormGroup({
      email: this.emailInput,
      password: this.passwordInput,
    });
    this.externalErrorMsg = "";
  }
 
  ngOnInit(): void {}
 
  login() {
    // Attempt to login
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (response) => {
          console.log("Login successful");
 
          // Store user in local storage to keep a user logged in between page refreshes
          localStorage.removeItem("authToken");
          localStorage.setItem("authToken", response.authToken);
 
          // Load user data
          this.authService.authenticate().subscribe({
            next: (userData: User) => {
              // Store user data in local storage
              localStorage.setItem("currentUser", JSON.stringify(userData.name));
              localStorage.setItem("profileId", JSON.stringify(userData.profileId));
              // Redirect to home page
              this.router.navigate([`/profile/${userData.profileId}`]);
            },
            error: (error) => {
              this.externalErrorMsg = "Internal error please try again later";
            },
          });
        },
        error: (error) => {
          console.log(error, error.status);
          if (error.status === 403) {
            this.externalErrorMsg = "Wrong username/password";
          }
        },
      });
  }
}
