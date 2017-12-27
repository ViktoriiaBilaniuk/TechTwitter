import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Route, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../common/models/UserModel';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new UserModel;
  testEmail = 'test@mail.com';
  userFire: Observable <firebase.User>;


  constructor(public authService: AuthService, public router: Router, public http: HttpClient) { }

  ngOnInit() {
  }

  logIn() {
    this.authService.logIn(this.user.email, this.user.password)
      .then(value => {
      this.authService.success = true;
      console.log('User logined successfully!');
    })
      .catch(err => {
        console.log('Something went wrong with user login - ', err.message);
        this.authService.isError = true;
        this.authService.errorMessage = err.message;
      });

    this.authService.user.subscribe(data => {
      this.authService.fetchUser(data.email);
      console.log(data.email);
    });
    this.user.email = this.user.password = '';
    this.authService.fetchUser(this.testEmail)
      .subscribe( (data) => {
        console.log(data[0].payload.val(), data[0].payload.key);
      });
    this.router.navigate(['../../profile']);
  }

  logOut() {
    this.authService.logOut();
  }


}
