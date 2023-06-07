import { Component, OnInit } from '@angular/core';
import { ProfileInterface } from 'src/app/interfaces/profile-inteface';
import { ProfileService } from 'src/app/services/profile.service';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { EnquiryInterface } from 'src/app/interfaces/enquiry-interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../home/home.component.css']
})
export class ContactComponent implements OnInit{
  enquiry!: EnquiryInterface;
  externalErrorMsg: string;
  contactForm: FormGroup;
  nameInput: FormControl;
  emailInput: FormControl;
  subjectInput: FormControl;
  messageInput: FormControl;
  categoryInput: FormControl;
  isProfileOwnerAndIsLoggedIn!: boolean;
  profileId!: any | null;
  name!: string | null;
  profile: ProfileInterface;

  constructor(private profileService: ProfileService, private activatedRoute: ActivatedRoute){
    this.nameInput = new FormControl("", [Validators.required]);
    this.emailInput = new FormControl("", [
      Validators.required,
      Validators.email,
    ]);
    this.subjectInput = new FormControl("", [Validators.required]);
    this.messageInput = new FormControl("", [Validators.required]);
    this.categoryInput = new FormControl("", [Validators.required]);

    this.contactForm = new FormGroup({
      name: this.nameInput,
      email: this.emailInput,
      subject: this.subjectInput,
      message: this.messageInput,
      category: this.categoryInput,
    });
    this.externalErrorMsg = "";
    this.profile = this.profileService.profile;
  }

  submitEnquiry():void{
    this.enquiry=this.contactForm.value;
    this.profileService.createEnquiry(this.profile.id, this.enquiry).subscribe({
      next: (data) => {
        this.enquiry = data;
        this.contactForm.reset();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem("currentUser") as string);
    this.getProfile();
    this.profileId = JSON.parse(localStorage.getItem("profileId") as string);
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

  changeHeaderBackgroundImg():void{
    let bgPic = prompt ('New background picture:');
    if(bgPic!==null){
      this.profile.contact.backgroundImage = bgPic;
      this.edit(); 
    }
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
