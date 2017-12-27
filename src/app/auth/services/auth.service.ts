import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../common/models/UserModel';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {environment} from '../environments/environment';



@Injectable()
export class AuthService {

  usersUrl = '/users';
  user: Observable <firebase.User>;
  currentUser: UserModel;
  errorMessage = '';
  isError = false;
  success = false;
  usersRef: AngularFireList<UserModel> = this.db.list<UserModel>(this.usersUrl);

  constructor(private firebaseAuth: AngularFireAuth, public http: HttpClient, private db: AngularFireDatabase) {
    this.user = firebaseAuth.authState;
  }

  signUp(userModel: UserModel) {
    return this.http.post( environment.firebase.databaseURL + this.usersUrl + '.json', {
      'firstName': userModel.firstName,
      'lastName': userModel.lastName,
      'email': userModel.email,
      'password': userModel.password,
    });
  }

  signUpInFireAuth(email: string, password: string) {
    this.isError = false;
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password);
  }

  logIn(email: string, password: string) {
    this.isError = false;
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password);
  }

  fetchUser(email) {
    return this.db.list<UserModel>(this.usersUrl, ref => ref.orderByChild('email').equalTo(email)).snapshotChanges();
  }

  logOut() {
    this.firebaseAuth
      .auth
      .signOut();
  }
  getAllUsers() {
    return this.usersRef.snapshotChanges();
  }

}

