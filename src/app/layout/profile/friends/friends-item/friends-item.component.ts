import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../../../../common/services/profile.service';
import {UserModel} from '../../../../common/models/UserModel';
import {debug} from 'util';

@Component({
  selector: 'app-friends-item',
  templateUrl: './friends-item.component.html',
  styleUrls: ['./friends-item.component.scss']
})
export class FriendsItemComponent implements OnInit {
  currentUser: any;
  friendsOfCurrentUser: any[] = [];

  constructor(public profileService: ProfileService, private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    this.getFriends();
  }

  ngOnInit() {
  }

  getFriends() {
    console.log(this.currentUser.followers);
    this.currentUser.followers.forEach(item => {
      console.log(item);
       this.profileService.getFriend('-L1xnYoWUpb_36WbYjMe')
         .subscribe((friend) => {
             console.log(friend);
             this.friendsOfCurrentUser.push(friend);
           }
         );
    });
  }
}
