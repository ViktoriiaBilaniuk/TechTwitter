import { Injectable } from '@angular/core';
import {UserModel} from '../models/UserModel';
import {PostModel} from '../models/PostModel';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ProfileService {
   currentUser: UserModel;
  usersUrl = '/users';
  postsOfCurrentUser: PostModel;
  postsUrl = '/walls';
  postsRef: AngularFireList<PostModel> = this.db.list<PostModel>(this.postsUrl);
  usersRef: AngularFireList<UserModel> = this.db.list<UserModel>(this.usersUrl);
  userValue = new Subject();

  constructor(private db: AngularFireDatabase) {
    // this.currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
  }
   getCurrentUser() {
     return JSON.parse(localStorage.getItem('CurrentUser'));
  }

  fetchPosts(userId) {
    return this.db.list<PostModel>(this.postsUrl, ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }

  getAllUsers() {
    return this.usersRef.snapshotChanges();
  }





}
