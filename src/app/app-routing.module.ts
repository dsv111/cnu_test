import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DiabetesComponent } from './diabetes/diabetes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateComponent } from './update/update.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RxjsLearningComponent } from './rxjs-learning/rxjs-learning.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'changepwds', component: UpdateComponent },
  { path: 'entry-form', component: DiabetesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'rxjs', component: RxjsLearningComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
