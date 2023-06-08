import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './components/error/error.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileService } from './services/profile.service';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ApiHomeComponent } from './components/api/api.home/api.home.component';
import { ApiNavbarComponent } from './components/api/api.navbar/api.navbar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { EnquiriesListComponent } from './components/enquiries-list/enquiries-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    ErrorComponent,
    NavbarComponent,
    GalleryComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ApiHomeComponent,
    ApiNavbarComponent,
    SpinnerComponent,
    EnquiriesListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
