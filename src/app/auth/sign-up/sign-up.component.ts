import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../common/services/auth.service';
import {UserModel} from '../../common/models/UserModel';
import {User} from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user = new UserModel();
  disable = true;


  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {

  }

  signUp(form) {
    console.log(this.user, form.value)
    if (form.valid) {
      console.log('valid');
    } else {
      console.log('invalid');
    }
    this.authService.signUp(this.user)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error in post user!');
        }
      );
    this.authService.signUpInFireAuth(this.user.email, this.user.password)
      .then(value => {
        console.log('User signuped successfully!!', value);
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


