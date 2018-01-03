import { Injectable } from '@angular/core';
import {UserModel} from '../models/UserModel';
import {PostModel} from '../models/PostModel';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Subject} from 'rxjs/Subject';
import {AuthService} from './auth.service';
import {environment} from '../../auth/environments/environment';
import {HttpClient} from '@angular/common/http';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProfileService {
  usersUrl = '/users';
  postsUrl = '/walls';
  followsUrl = '/walls';
  userRef: any;
  postsRef: AngularFireList<PostModel> = this.db.list<PostModel>(this.postsUrl);
  usersRef: AngularFireList<UserModel> = this.db.list<UserModel>(this.usersUrl);
  userValue = new Subject();
  allUsers: UserModel[] = [];
  currentUser: UserModel;

  constructor(private db: AngularFireDatabase, private authService: AuthService, public http: HttpClient) {
    // this.currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
  }
   getCurrentUser() {
     return JSON.parse(localStorage.getItem('CurrentUser'));
  }

  fetchPosts(userId) {
    return this.db.list<PostModel>(this.postsUrl, ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }
  getFriend(friendId) {
    return this.db.object(`users/${friendId}`).valueChanges();
  }

  getAllUsers(): Observable<any> {
    return this.db.list(this.usersUrl).snapshotChanges();
  }

  addNewFollower(user, followUserId) {
    const items = this.db.list('/users');
    if (!user.followers) {
      user.followers = [];
    }
    user.followers.push(followUserId);
    console.log(user.userId);
    items.update(user.userId, { followers : user.followers})
      .then((item) => {
        console.log(item);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

