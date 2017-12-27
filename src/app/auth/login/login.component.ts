import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Route, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../common/models/UserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new UserModel;
  testEmail = 'test@mail.com';


  constructor(public authService: AuthService, public router: Router, public http: HttpClient) { }

  ngOnInit() {
  }

  logIn() {
    this.authService.logIn(this.user.email, this.user.password);
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
