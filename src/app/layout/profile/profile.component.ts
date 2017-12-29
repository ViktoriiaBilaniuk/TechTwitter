import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../common/models/UserModel';
import {ProfileService} from '../../common/services/profile.service';
import {AuthService} from '../../common/services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: UserModel;

  constructor(public profileService: ProfileService, public authService: AuthService) {
    this.authService.userValue.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
   // this.currentUser = this.profileService.getCurrentUser();
  }





}
