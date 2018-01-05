import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../../common/services/profile.service';
import {UserModel} from '../../../../common/models/UserModel';


@Component({
  selector: 'app-friends-item',
  templateUrl: './friends-item.component.html',
  styleUrls: ['./friends-item.component.scss']
})
export class FriendsItemComponent implements OnInit {
  currentUser: UserModel;
  currentUserId: any;
  dontHaveFriends = true;
  openConfirmWondow = false;
  friends: any[] = [];

  constructor(public profileService: ProfileService) {}

  ngOnInit() {
    this.dontHaveFriends = false;
    this.currentUserId = JSON.parse(localStorage.getItem('CurrentUserId'));
    this.profileService.getCurrentUser(this.currentUserId)
      .subscribe(currentUser => {
        this.currentUser = currentUser.payload.val();
        if (this.currentUser.followers === null || this.currentUser.followers === undefined) {
          this.currentUser.followers = [];
          this.dontHaveFriends = true;
        }
        this.getFriends();
      });
  }
  getFriends() {
    this.friends = this.profileService.getFriends(this.currentUser.followers);
  }
  openConfirmDialog() {
    this.openConfirmWondow = !this.openConfirmWondow;
  }
  removeFriend(indexOfUser) {
    this.profileService.removeFriend(this.currentUserId, indexOfUser);
    this.openConfirmDialog();
  }
}
