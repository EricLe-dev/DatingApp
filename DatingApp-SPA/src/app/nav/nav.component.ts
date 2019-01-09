import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  userName: any = 'user';

  constructor(public authService: AuthService, private alertify: AlertifyService,
     private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in succesfully');
      // this.userName = this.authService.userNameToDisplay().charAt(0).toUpperCase() + this.authService.userNameToDisplay().slice(1);
      this.alertify.success(`Logged in successfully`);
    }, error => {
      console.log(error);
    }, () => {
      this.router.navigate(['/member']);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out');
    this.alertify.message(`Logged out`);
    this.userName = 'user';
    this.router.navigate(['/home']);
  }
}
