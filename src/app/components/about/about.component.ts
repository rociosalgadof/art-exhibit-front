import { Component, OnInit } from '@angular/core';
import { ProfileInterface } from 'src/app/interfaces/profile-inteface';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css', '../home/home.component.css']
})
export class AboutComponent implements OnInit{
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

  changeProjectTitle(index:number):void{
    let title = prompt ('Enter title:');
    if(title!==null){
      this.profile.about.middleSection[index].title = title;
      this.edit(); 
    }
  }

  changeProjectDescription(index:number):void{
    let description = prompt ('Enter text:');
    if(description!==null){
      this.profile.about.middleSection[index].description = description;
      this.edit(); 
    }
  }

  editParagraph(index:number):void{
    let p = prompt ('Enter new paragraph:');
    if(p!==null){
      this.profile.about.description[index].text = p;
      this.edit(); 
    }
  }

  deleteParagraph(index:number):void{
    this.profile.about.description.splice(index, 1);
    this.edit(); 
  }

  editLinkedInLink():void{
    let p = prompt ('Enter new link:');
    if(p!==null){
      this.profile.about.linkedIn = p;
      this.edit(); 
    }
  }

  editHeaderBackgroundImg():void{
    let p = prompt ('Enter new image:');
    if(p!==null){
      this.profile.about.headerBackgroundImg = p;
      this.edit(); 
    }
  }

  editContactBackgroundImg():void{
    let p = prompt ('Enter new image:');
    if(p!==null){
      this.profile.about.contactInfoBackgroundImg = p;
      this.edit(); 
    }
  }

  goToLink() {
    let url = this.profile.about.linkedIn;
    window.open(url, "_blank");
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
