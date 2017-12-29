import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../../../../common/services/profile.service';
import {UserModel} from '../../../../common/models/UserModel';

@Component({
  selector: 'app-friends-item',
  templateUrl: './friends-item.component.html',
  styleUrls: ['./friends-item.component.scss']
})
export class FriendsItemComponent implements OnInit {
  currentUser: UserModel;

  constructor(public profileService: ProfileService, private http: HttpClient) { }

  ngOnInit() {
  }
  followUser() {
    this.init();
    this.http.post('https://techtwitter2018.firebaseio.com/follows.json', {
      userId: this.currentUser.userId
    })
      .subscribe(
        res => {
          console.log('User fallowed!' +  res);
        },
        err => {
          console.log('Error on follow user');
        }
      );
  }
  init() {
    this.currentUser = this.profileService.getCurrentUser();
  }


}
