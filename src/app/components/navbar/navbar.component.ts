import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileInterface } from 'src/app/interfaces/profile-inteface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../home/home.component.css']
})
export class NavbarComponent implements OnInit{
  name!: string | null;
  profile: ProfileInterface;
  constructor(private authService: AuthService, private router: Router, private profileService: ProfileService) {
    this.profile = this.profileService.profile;
  }
 
  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem("currentUser") as string);
    this.getProfile();
  }
 
  logout(): void {
    // Log out
    this.authService.logout();
    // Redirect to login page
    this.router.navigate([`/api/login`]);
  }

  getProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        // console.log(data)
        this.profile = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
