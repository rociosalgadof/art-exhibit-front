import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ApiHomeComponent } from './components/api/api.home/api.home.component';

const routes:Routes=[
  {path: "profile/:id", component: HomeComponent}, 
  {path:"api/login", component: LoginComponent},
  {path:"api", component: ApiHomeComponent},
  {path:"api/signup", component: SignupComponent},
  {path: "about", component: AboutComponent}, 
  {path:"gallery", component: GalleryComponent}, 
  {path: "contact", component: ContactComponent}, 
  {path: "**", component: ErrorComponent}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
