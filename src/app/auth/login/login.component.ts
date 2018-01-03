import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../common/services/auth.service';
import {Route, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../common/models/UserModel';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {User} from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new UserModel;
  currentUser: UserModel;

  constructor(public authService: AuthService, public router: Router, public http: HttpClient) { }

  ngOnInit() {
    if (localStorage.getItem('CurrentUser')) {
      localStorage.removeItem('CurrentUser');
    }
  }

  logIn() {
    this.authService.logIn(this.user.email, this.user.password)
      .then(value => {
        this.authService.success = true;
        console.log('User logined successfully!');
        this.authService.fetchUser(value.email)
          .subscribe((user) => {
            this.currentUser = user[0].payload.val();
            this.currentUser.userId = user[0].payload.key;
            // localStorage.setItem('CurrentUser', JSON.stringify(this.currentUser));
            this.authService.currentUser = this.currentUser;
            setTimeout(() => {
              this.router.navigate(['../../profile']);
            }, 0);
          });
      })
      .catch ( err => {
        console.log('Something went wrong with user login - ', err.message);
        this.authService.isError = true;
        this.authService.errorMessage = err.message;
      });

    this.user.email = this.user.password = '';
  }


}
