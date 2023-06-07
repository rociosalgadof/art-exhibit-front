import { Component, OnInit } from '@angular/core';
import { ProfileInterface } from 'src/app/interfaces/profile-inteface';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css', '../home/home.component.css', '../about/about.component.css']
})
export class GalleryComponent implements OnInit{
  isProfileOwnerAndIsLoggedIn!: boolean;
  profileId!: any | null;
  name!: string | null;
  profile: ProfileInterface;
  constructor(private profileService: ProfileService){
    this.profile = this.profileService.profile;
  }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem("currentUser") as string);
    this.getProfile();
    this.profileId = JSON.parse(localStorage.getItem("profileId") as string);
  }

  getProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        if( this.profileId == this.profile.id){
          this.isProfileOwnerAndIsLoggedIn=true;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
