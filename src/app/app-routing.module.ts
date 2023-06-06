import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ErrorComponent } from './components/error/error.component';
import { GalleryComponent } from './components/gallery/gallery.component';

const routes:Routes=[{path: "", component: HomeComponent}, {path: "about", component: AboutComponent}, {path:"gallery", component: GalleryComponent}, {path: "contact", component: ContactComponent}, {path: "**", component: ErrorComponent}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
