import { Component } from '@angular/core';
import { ProfileInterface } from 'src/app/interfaces/profile-inteface';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css', '../home/home.component.css', '../contact/contact.component.css']
})
export class ErrorComponent {
  isProfileOwnerAndIsLoggedIn!: boolean;
  profileId!: any | null;
  name!: string | null;
  profile: ProfileInterface;
  constructor(private profileService: ProfileService, private activatedRoute: ActivatedRoute){
    this.profile = this.profileService.profile;
  }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem("currentUser") as string);
    this.getProfile();
    this.profileId = JSON.parse(localStorage.getItem("profileId") as string);
  }

  getProfile(): void {
    const id: number = this.activatedRoute.snapshot.params["id"];
    this.profileService.getProfile(id).subscribe({
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
