import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../common/services/profile.service';
import {UserModel} from '../../common/models/UserModel';
import {AngularFireDatabase} from 'angularfire2/database';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  currentUser: UserModel;
  users: any;
  buttonText = 'Follow';

  constructor(public profileService: ProfileService) {
    this.currentUser = this.profileService.getCurrentUser();
  }

  ngOnInit() {
    this.profileService.getAllUsers()
      .subscribe( (users) => {
        this.users = users.map(user => {
          return {
            id: user.key,
            ...user.payload.val()
          };
        });
        }
      );
  }

  addNewFollower(followUserId) {
    this.profileService.addNewFollower(this.currentUser, followUserId);
  }



}
