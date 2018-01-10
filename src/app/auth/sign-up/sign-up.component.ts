import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../common/services/auth.service';
import {UserModel} from '../../common/models/UserModel';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user = new UserModel();

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {}

  signUp() {
    this.authService.signUp(this.user)
      .subscribe(
        res => {
          console.log('User signuped successfully!');
        },
        err => {
          console.log('Error in post user!');
        }
      );
    this.authService.signUpInFireAuth(this.user.email, this.user.password)
      .then(value => {
        console.log('User signuped successfully in fire', value);
        this.authService.success = true;
        setTimeout(() => {
          this.router.navigate(['../login']);
        }, 2000);
      })
      .catch(err => {
        console.log('Something went wrong with user signup - ', err.message);
        this.authService.isError = true;
        this.authService.errorMessage = err.message;
      });
    this.user.email = this.user.password = this.user.firstName = this.user.lastName = '';
  }
}


