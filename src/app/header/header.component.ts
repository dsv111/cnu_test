import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BloodsugarService } from '../bloodsugar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userAccess: any = [];
  userName: any;
  showProfileCard = false;

  constructor(private router:Router, private headerServ:BloodsugarService) {
    const access = localStorage.getItem('form-data');
    this.userAccess = access !== null ? JSON.parse(access) : '';
    
  }

  ngOnInit() {
    this.headerServ.getUser().subscribe(username => {
      this.userName = username;
      console.log(username);
      console.log(this.userName);
      
    });
    console.log('aaaaaaaaa');
    
  }

  Signout() {
    this.userAccess.clear();
    localStorage.clear();
  }

  toggleProfileCard() {
    this.showProfileCard = !this.showProfileCard;
  }

  updateDetails() {
    this.router.navigateByUrl('/changepwds');
  }

  signOut() {
    this.router.navigateByUrl('/login');
  }

}
