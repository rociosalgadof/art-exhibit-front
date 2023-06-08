import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileInterface } from 'src/app/interfaces/profile-inteface';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  isProfileOwnerAndIsLoggedIn!: boolean;
  profileId!: any | null;
  name!: string | null;
  profile: ProfileInterface;
  constructor(private profileService: ProfileService, private activatedRoute: ActivatedRoute, private router: Router){
    this.profile = this.profileService.profile;
  }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem("currentUser") as string);
    this.getProfile();
    this.profileId = JSON.parse(localStorage.getItem("profileId") as string);
  }

  changeSubtitle():void{
    let subtitle = prompt ('Enter subtitle:');
    if(subtitle!==null){
      this.profile.home.subtitle = subtitle;
      this.edit(); 
    }
  }

  changeProjectTitle(index:number):void{
    let title = prompt ('Enter title:');
    if(title!==null){
      this.profile.home.listOfProjects[index].title = title;
      this.edit(); 
    }
  }

  changeProjectImage(index:number):void{
    let image = prompt ('Enter new image:');
    if(image!==null){
      this.profile.home.listOfProjects[index].image = image;
      this.edit(); 
    }
  }

  changeProjectSubtitle(index:number):void{
    let subtitle = prompt ('Enter subtitle:');
    if(subtitle!==null){
      this.profile.home.listOfProjects[index].subtitle = subtitle;
      this.edit(); 
    }
  }

  changeHeaderBackgroundImg():void{
    let bgPic = prompt ('New background picture:');
    if(bgPic!==null){
      this.profile.home.headerBackgroundImg = bgPic;
      this.edit(); 
    }
  }

  changeBackstoryImg():void{
    let bgPic = prompt ('New background picture:');
    if(bgPic!==null){
      this.profile.home.backstoryBackgroundImg = bgPic;
      this.edit(); 
    }
  }

  changeGetInTouchImg():void{
    let bgPic = prompt ('New background picture:');
    if(bgPic!==null){
      this.profile.home.gotAProjectBackgroundImg = bgPic;
      this.edit(); 
    }
  }

  edit():void{
    this.profileService.editProfile(this.profile.id, this.profile).subscribe({
      next: (data) => {
        this.profile = data;
        this.getProfile();
      },
      error: (error) => {
        console.log(error);
      },
    });
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
        this.router.navigate([`notfound`]);
      },
    });
  }
}
