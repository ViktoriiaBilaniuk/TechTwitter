import { Injectable } from '@angular/core';
import {UserModel} from '../models/UserModel';
import {PostModel} from '../models/PostModel';
import {AngularFireDatabase} from 'angularfire2/database';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProfileService {
  usersUrl = '/users';
  postsUrl = '/walls';
  currentUser: UserModel;

  constructor(private db: AngularFireDatabase, public http: HttpClient) {}
  getCurrentUser(userId) {
    return this.db.object(`users/${userId}`).snapshotChanges();
  }
  fetchPosts(userId) {
    return this.db.list<PostModel>(this.postsUrl, ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }
  getFriend(friendId) {
     return this.db.object(`users/${friendId}`).valueChanges();
  }
  getUser(userId) {
    return this.db.object(`users/${userId}`).snapshotChanges();
  }
  getFriends(friendArray) {
    const friends = [];
    friendArray.forEach((id) => {
      this.getFriend(id)
        .subscribe((item) => {
          friends.push(item);
        });
    });
    return friends;
  }

  getAllUsers(): Observable<any> {
    return this.db.list(this.usersUrl).snapshotChanges();
  }

  addNewFollower(user, followUserId) {
    const items = this.db.list('/users');
    if (user.followers === undefined) {
      user.followers = [];
    }
    user.followers.push(followUserId);
    items.update(user.userId, { followers : user.followers})
      .then((item) => {
        // console.log(item);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  removeFriend(currentUserId, indexOfUser) {
    const itemsRef = this.db.list('/users/' + currentUserId + '/followers');
    itemsRef.remove('' + indexOfUser);
  }
}

