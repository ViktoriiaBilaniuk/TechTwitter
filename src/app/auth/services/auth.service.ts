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
    this.http.post( environment.firebase.databaseURL + this.usersUrl + '.json', {
      'firstName': userModel.firstName,
      'lastName': userModel.lastName,
      'email': userModel.email,
      'password': userModel.password,
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error in post user!');
        }
      );
  }

  signUpInFireAuth(email: string, password: string) {
    this.isError = false;
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('User signuped successfully!!', value);
        this.success = true;
      })
      .catch(err => {
        console.log('Something went wrong with user signup - ', err.message);
        this.isError = true;
        this.errorMessage = err.message;
      });
  }

  logIn(email: string, password: string) {
    this.isError = false;
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.success = true;
        console.log('User logined successfully!');
      })
      .catch(err => {
        console.log('Something went wrong with user login - ', err.message);
        this.isError = true;
        this.errorMessage = err.message;
      });

    this.user.subscribe(data => {
      this.fetchUser(data.email);
      console.log(data.email);
    });
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

