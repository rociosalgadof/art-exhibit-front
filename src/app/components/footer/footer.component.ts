import { Component } from '@angular/core';
import { ProfileInterface } from 'src/app/interfaces/profile-inteface';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css', '../home/home.component.css']
})
export class FooterComponent {
  profile: ProfileInterface;
  constructor(private profileService: ProfileService, private activatedRoute: ActivatedRoute){
    this.profile = this.profileService.profile;
  }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    const id: number = this.activatedRoute.snapshot.params["id"];
    this.profileService.getProfile(id).subscribe({
      next: (data) => {
        this.profile = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
