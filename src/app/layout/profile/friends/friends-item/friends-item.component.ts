import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProfileService} from '../../../../common/services/profile.service';
import {UserModel} from '../../../../common/models/UserModel';
import {debug} from 'util';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-friends-item',
  templateUrl: './friends-item.component.html',
  styleUrls: ['./friends-item.component.scss']
})
export class FriendsItemComponent implements OnInit {
  currentUser: any;
  currentUser$: any;
  friendsOfCurrentUser: any[] = [];
  dontHaveFriends = false;
  openConfirmWondow = false;
  users$: any;

  constructor(public profileService: ProfileService, private http: HttpClient, private db: AngularFireDatabase) {
    // this.currentUser = JSON.parse(localStorage.getItem('CurrentUser'));

    setTimeout(() => {
      this.currentUser$ = this.db.object(`users/${this.currentUser.userId}`).valueChanges();
    }, 0);
    this.getFriends();
  }

  ngOnInit() {
   // this.getFriends();
  }

 /* getFriends() {
    let tempUser = {};
    console.log(typeof(this.currentUser.followers));
    if (this.currentUser.followers !== undefined) {
      Object.values(this.currentUser.followers).forEach(item => {
        console.log(item);
        if (item !== null) {
          this.profileService.getFriend(item)
            .subscribe((friend) => {
                tempUser = friend;
                tempUser['userId'] = item;
              this.friendsOfCurrentUser.push(friend);
                console.log( this.friendsOfCurrentUser);
              }
            );
        }
      });
    } else {
      this.dontHaveFriends = true;
    }
  }*/

 getFriends() {
    // console.log(this.profileService.getFriends(this.currentUser$.followers));
     this.currentUser$
       .subscribe( (user) => {
         this.users$ = this.profileService.getFriends(user.followers);
         }
       );
 }


  openConfirmDialog() {
    this.openConfirmWondow = !this.openConfirmWondow;
  }

  removeFriend(indexOfUser) {
    this.profileService.removeFriend(this.currentUser.userId, indexOfUser);
    this.openConfirmDialog();
  }
}
