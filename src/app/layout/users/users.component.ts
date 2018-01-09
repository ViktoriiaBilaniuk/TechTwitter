import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../common/services/profile.service';
import {UserModel} from '../../common/models/UserModel';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operator/map';
import {startWith} from 'rxjs/operator/startWith';
import {Subject} from 'rxjs/Subject';

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
  openMessage = false;
  added = [];


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
            this.added[user.key] = false;
            return {
              userId: user.key,
              ...user.payload.val()
            };
          })
            .filter(user => user.userId !== this.currentUserId);
        }
      );
  }

  addNewFollower(followUser) {
    this.added[followUser.userId] = true;
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
}
