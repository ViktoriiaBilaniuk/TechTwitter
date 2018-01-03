import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/UserModel';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {environment} from '../../auth/environments/environment';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';




@Injectable()
export class AuthService {

  usersUrl = '/users';
  user: Observable <firebase.User>;
  errorMessage = '';
  isError = false;
  success = false;
  usersRef: AngularFireList<UserModel> = this.db.list<UserModel>(this.usersUrl);
  userValue: Subject<any>;

  constructor(private firebaseAuth: AngularFireAuth, public http: HttpClient, private db: AngularFireDatabase, public router: Router) {
    this.userValue = new Subject();
    this.user = firebaseAuth.authState;
  }

  set currentUser(value) {
    this.userValue.next(value);
    localStorage.setItem('CurrentUser', JSON.stringify(value));
  }


  signUp(userModel: UserModel) {
    return this.http.post( environment.firebase.databaseURL + this.usersUrl + '.json', {
      'firstName': userModel.firstName,
      'lastName': userModel.lastName,
      'email': userModel.email,
      'followers': [1,2,3]
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
    localStorage.removeItem('CurrentUser');
    this.router.navigate(['../../auth/login']);
    /*this.firebaseAuth
      .auth
      .signOut();*/
  }
  getAllUsers() {
    return this.db.list(this.usersUrl);
    //return this.usersRef.snapshotChanges();
  }


}

