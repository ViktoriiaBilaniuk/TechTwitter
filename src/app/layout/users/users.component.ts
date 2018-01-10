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
  openMessage = false;

  constructor(public profileService: ProfileService) {}

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('CurrentUserId'));
    this.profileService.getCurrentUser(this.currentUserId)
      .subscribe(currentUser => {
        this.currentUser = currentUser.payload.val();
        this.currentUser.userId = currentUser.key;
      });

    this.profileService.getAllUsers()
      .subscribe( (users) => {
          this.users = users.map(user => {
            return {
              isFriendOfCurrentUser: this.isFallowerOfCurrentUser(this.currentUser, user.key),
              userId: user.key,
              ...user.payload.val()
            };
          })
            .filter(user => user.userId !== this.currentUserId);
        }
      );
  }

  addNewFollower(followUser) {
    this.profileService.addNewFollower(this.currentUser, followUser.userId)
      .then((item) => {
        this.openMessage = true;
        setTimeout(() => {
          this.openMessage = false;
          }, 1000
        );
         console.log('friend added!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getButtonText(user) {
    return user.isFriendOfCurrentUser ? 'Your friend' : 'Add friend';
  }

  disableButton(user) {
    return user.isFriendOfCurrentUser;
  }

  isFallowerOfCurrentUser(currentUser, userId) {
    if(currentUser.followers) {
      return currentUser.followers.includes(userId);
    } else {
      return false;
    }
  }
}
