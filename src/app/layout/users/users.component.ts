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
  buttonText = 'Follow';
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
        console.log(this.users);
        }
      );

    this.currentUserId = JSON.parse(localStorage.getItem('CurrentUserId'));
    console.log(this.currentUserId);
    this.profileService.getCurrentUser(this.currentUserId)
      .subscribe(currentUser => {
        this.currentUser = currentUser.payload.val();
        this.currentUser.userId = currentUser.key;
      });
  }

  addNewFollower(followUser) {
    this.added[followUser.userId] = true;
    console.log(this.added);
    console.log(followUser);
    this.profileService.addNewFollower(this.currentUser, followUser.userId);
  }
}
