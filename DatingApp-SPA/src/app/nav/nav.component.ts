import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in succesfully')
    }, error => {
      console.log('Failed to login')
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token; // if there is something in the token, return true else return false
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out');
  }
}
