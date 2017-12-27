import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserModel} from '../../common/models/UserModel';
import {User} from 'firebase';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user = new UserModel;


  constructor(public authService: AuthService, public userModel: UserModel) { }

  ngOnInit() {
  }

  signUp() {
    this.authService.signUp(this.user);
    this.authService.signUpInFireAuth(this.user.email, this.user.password);
    this.user.email = this.user.password = this.user.firstName = this.user.lastName = '';
  }

}
