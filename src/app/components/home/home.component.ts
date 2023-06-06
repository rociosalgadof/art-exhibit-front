import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileInterface } from 'src/app/interfaces/profile-inteface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  profile: ProfileInterface;
  constructor(private profileService: ProfileService){
    this.profile = this.profileService.profile;
  }

  ngOnInit(): void {
    this.getProfile();
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
