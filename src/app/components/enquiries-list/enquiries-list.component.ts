import { Component } from '@angular/core';
import { ProfileInterface } from 'src/app/interfaces/profile-inteface';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { EnquiryInterface } from 'src/app/interfaces/enquiry-interface';

@Component({
  selector: 'app-enquiries-list',
  templateUrl: './enquiries-list.component.html',
  styleUrls: ['./enquiries-list.component.css','../contact/contact.component.css', '../home/home.component.css']
})
export class EnquiriesListComponent {
  isProfileOwnerAndIsLoggedIn!: boolean;
  profileId!: any | null;
  profile: ProfileInterface;
  enquiryList!: EnquiryInterface[];
  constructor(private profileService: ProfileService, private activatedRoute: ActivatedRoute){
    this.profile = this.profileService.profile;
  }

  ngOnInit(): void {
    this.getProfile();
    this.getAllEnquiries();
  }

  deleteEnquiry(enquiryId:number):void{
    const profileId: number = this.activatedRoute.snapshot.params["id"];
    this.profileService.deleteEnquiry(profileId, enquiryId).subscribe({
      next: (data) => {
        console.log(data);
        this.getProfile();
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  getAllEnquiries():void{
    const id: number = this.activatedRoute.snapshot.params["id"];
    this.profileService.getAllEnquiries(id).subscribe({
      next: (data) => {
        this.enquiryList = data;
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
