import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../common/models/UserModel';
import {AuthService} from '../../common/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: UserModel;

  constructor(public authService: AuthService) {
    this.authService.userValue.subscribe((user) => {
      this.currentUser = user;
    });
  }
  ngOnInit() {}





}
