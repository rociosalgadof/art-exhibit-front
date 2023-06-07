import { Component, OnInit } from '@angular/core';
import { ProfileInterface } from 'src/app/interfaces/profile-inteface';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private profileService: ProfileService, private activatedRoute: ActivatedRoute){
    this.profile = this.profileService.profile;
  }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem("currentUser") as string);
    this.getProfile();
    this.profileId = JSON.parse(localStorage.getItem("profileId") as string);
  }

  addImagesToSlidder():void{
    let newPic = prompt ('Add picture:');
    let defaultPic = "https://images.unsplash.com/photo-1614103812210-e468413c3dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
    if(this.profile.gallery.listOfImages[0].image===defaultPic){
      if(newPic!==null){
        this.profile.gallery.listOfImages.length=0;
        this.profile.gallery.listOfImages.push({image: newPic});
        this.edit(); 
      }
    }else{
      if(newPic!==null){
      this.profile.gallery.listOfImages.push({image: newPic});
      this.edit();}  
    }
  }

  changeHeaderBackgroundImg():void{
    let bgPic = prompt ('New background picture:');
    if(bgPic!==null){
      this.profile.gallery.headerBackgroundImg = bgPic;
      this.edit(); 
    }
  }

  changeFooterBackgroundImg():void{
    let bgPic = prompt ('New background picture:');
    if(bgPic!==null){
      this.profile.gallery.footerImage = bgPic;
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
        console.log(error);
      },
    });
  }
}
