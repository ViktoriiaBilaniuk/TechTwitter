import { Injectable } from '@angular/core';
import {UserModel} from '../models/UserModel';
import {PostModel} from '../models/PostModel';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Subject} from 'rxjs/Subject';
import {AuthService} from './auth.service';

@Injectable()
export class ProfileService {
  usersUrl = '/users';
  postsUrl = '/walls';
  postsRef: AngularFireList<PostModel> = this.db.list<PostModel>(this.postsUrl);
  usersRef: AngularFireList<UserModel> = this.db.list<UserModel>(this.usersUrl);
  userValue = new Subject();
  allUsers: UserModel[] = [];
  currentUser: UserModel;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    // this.currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
  }
   getCurrentUser() {
     return JSON.parse(localStorage.getItem('CurrentUser'));
  }

  fetchPosts(userId) {
    return this.db.list<PostModel>(this.postsUrl, ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }

  getAllUsers() {
    return this.db.list(this.usersUrl);
    // return this.usersRef.snapshotChanges();
  }





}
