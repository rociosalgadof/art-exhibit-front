import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../../contact/contact.component.css', '../../home/home.component.css']
})

export class SignupComponent implements OnInit{
  registerForm: FormGroup;
  nameInput: FormControl;
  emailInput: FormControl;
  passwordInput: FormControl;
  isFormInvalid:boolean;
 
  constructor(private router: Router, private authService: AuthService) {
    this.isFormInvalid=false;
    this.nameInput = new FormControl("", [Validators.required]);
    this.emailInput = new FormControl("", [
      Validators.required,
      Validators.email,
    ]);
    this.passwordInput = new FormControl("", [Validators.required]);
    this.registerForm = new FormGroup({
      name: this.nameInput,
      email: this.emailInput,
      password: this.passwordInput,
    });
  }
 
  ngOnInit(): void {}

  signup() {
    if (!this.registerForm.valid) {
      this.isFormInvalid=true;
      console.log(this.isFormInvalid);
      console.log("chau");
    }else{
      console.log("hola")
      this.authService
      .register(
        this.registerForm.value.name,
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .subscribe({
        next: (user: User) => {
          this.isFormInvalid=true;
          // alert("Register successful");
          // console.log(user);
 
          // Redirect to login page
          this.router.navigate(["/api/login"]);
        },
        error: (error) => {
          alert("Register failed");
          console.log(error);
        },
      });
  }
    }
}
