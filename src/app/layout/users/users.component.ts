import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../common/services/profile.service';
import {PostModel} from '../../common/models/PostModel';
import {UserModel} from '../../common/models/UserModel';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersUrl = '/users';
  user: Observable <firebase.User>;
  usersRef: AngularFireList<UserModel> = this.db.list<UserModel>(this.usersUrl);
  allUsers: Observable<any>;

  constructor(public profileService: ProfileService, private db: AngularFireDatabase) {
    this.usersRef.snapshotChanges(['child_added'])
      .subscribe(actions => {
        actions.forEach(action => {
          console.log(action.type);
          console.log(action.key);
          console.log(action.payload.val());
        });
      });
  }

  ngOnInit() {

  }

}
