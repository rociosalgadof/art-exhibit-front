import { Component } from '@angular/core';
import { ProfileInterface } from 'src/app/interfaces/profile-inteface';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../home/home.component.css']
})
export class ContactComponent {
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
        this.profile = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
