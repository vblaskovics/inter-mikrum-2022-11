import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LandingTodobynameComponent } from './pages/landing-todobyname/landing-todobyname.component';
import { LandingTodobynameStreamComponent } from './pages/landing-todobyname-stream/landing-todobyname-stream.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LandingTodobynameComponent,
    LandingTodobynameStreamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
