import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../common/models/UserModel';
import {ProfileService} from '../../common/services/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: UserModel;

  constructor(public profileService: ProfileService) {

  }

  ngOnInit() {
   // this.currentUser = this.profileService.getCurrentUser();
  }





}
