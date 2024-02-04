import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DiabetesComponent } from './diabetes/diabetes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateComponent } from './update/update.component';
import * as nodemailer from 'nodemailer';
import { HomeComponent } from './home/home.component';
import { RxjsLearningComponent } from './rxjs-learning/rxjs-learning.component';
import { BloodsugarService } from './bloodsugar.service';
import { RxjsService } from './rxjs-learning/rxjs.service';
import { HttpClientModule } from '@angular/common/http';
import { NocopyDirective } from './common/nocopy.directive';
import { FilterPipe } from './common/filter.pipe';

@NgModule({
  declarations: [
    NocopyDirective,
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    DiabetesComponent,
    DashboardComponent,
    UpdateComponent,
    HomeComponent,
    RxjsLearningComponent,
    FilterPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [BloodsugarService,RxjsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
