import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private alertify: AlertifyService,
     private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    // this.loadUsers();
    this.route.data.subscribe(data => {
      this.users = data['user'];
    });
    for (let index = 0; index < this.users.length; index++) {
      if (this.authService.decodedToken.unique_name === this.users[index].username) {
        this.users.splice(index, 1);
      }
    }
  }

  loadUsers() {
   this.userService.getUsers().subscribe((users: User[]) => {
     this.users = users;
   }, error => {
     this.alertify.error(error);
   });
  }

}
