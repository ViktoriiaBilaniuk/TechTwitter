import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../common/services/profile.service';
import {UserModel} from '../../common/models/UserModel';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  currentUser = new UserModel;
  currentUserId: any;
  users: any;
  buttonText = 'Add friend';
  added = [];

  constructor(public profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getAllUsers()
      .subscribe( (users) => {
        this.users = users.map(user => {
          this.added[user.key] = false;
          return {
            userId: user.key,
            ...user.payload.val()
          };
        });
        }
      );

    this.currentUserId = JSON.parse(localStorage.getItem('CurrentUserId'));
    this.profileService.getCurrentUser(this.currentUserId)
      .subscribe(currentUser => {
        this.currentUser = currentUser.payload.val();
        this.currentUser.userId = currentUser.key;
      });
  }

  addNewFollower(followUser) {
    this.added[followUser.userId] = true;
    this.profileService.addNewFollower(this.currentUser, followUser.userId);
  }
}
