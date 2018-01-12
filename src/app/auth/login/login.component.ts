import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../common/services/auth.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../common/models/UserModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  user = new UserModel;
  currentUser: UserModel;
  user$: any;

  constructor(public authService: AuthService, public router: Router, public http: HttpClient) { }

  ngOnInit() {
    this.user.email = this.user.password  = '';
    if (localStorage.getItem('CurrentUser')) {
      localStorage.removeItem('CurrentUser');
    }
    if (localStorage.getItem('CurrentUserId')) {
      localStorage.removeItem('CurrentUserId');
    }
  }

  logIn() {
    this.authService.logIn(this.user.email, this.user.password)
      .then(value => {
        this.authService.success = true;
        console.log('User logined successfully!');
        this.user$ = this.authService.fetchUser(value.email)
          .subscribe((user) => {
            this.currentUser = user[0].payload.val();
            this.currentUser.userId = user[0].payload.key;
            this.authService.currentUser = this.currentUser;
            this.authService.currentUserId = this.currentUser.userId;
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

  ngOnDestroy() {
    if (this.user$) {
      this.user$.unsubscribe();
    }
  }
}
