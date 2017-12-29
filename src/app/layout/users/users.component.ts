import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../common/services/profile.service';
import {UserModel} from '../../common/models/UserModel';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  currentUser: UserModel;
  users: any;

  constructor(public profileService: ProfileService, private db: AngularFireDatabase, private http: HttpClient) {
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
          console.log(this.users);
        }
      );
  }

  addNewFollower(followUserId) {
    this.profileService.addNewFollower(this.currentUser, followUserId);
  }

}
