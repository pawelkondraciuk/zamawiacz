import { Component, OnInit, ElementRef } from '@angular/core';
import { UserDataService } from '../shared/user-data.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[];

  userToRemove: User;
  userToEdit: User;

  userName = '';
  adding = false;

  constructor(private userData: UserDataService) { }

  ngOnInit() {
    this.userData.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  remove(user: User) {
    if (this.userToRemove) {
      return;
    }
    this.userToRemove = user;
    this.userData.removeUser(user)
      .subscribe(
        () => { this.userToRemove = null; },
        () => { this.userToRemove = null; }
      );
  }

  add() {
    if (!this.userName) {
      return;
    }
    this.adding = true;
    this.userData.createUser(this.userName)
      .subscribe(
        () => {
          this.userName = null;
          this.adding = false;
        },
        () => { this.adding = false; }
      );
  }

  edit(user: User) {
    if (this.userToEdit && !user) {
      this.userData.updateUser(this.userToEdit, this.userName)
        .subscribe(
          () => {
            this.userToEdit = null;
            this.userName = '';
          },
          () => {
            this.userToEdit = null;
            this.userName = '';
          }
        );
    } else {
      this.userToEdit = user;
      this.userName = user.name;
    }
  }
}
