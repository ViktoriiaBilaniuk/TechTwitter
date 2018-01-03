import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../common/services/profile.service';
import {UserModel} from '../../../common/models/UserModel';
import {PostModel} from '../../../common/models/PostModel';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  constructor(public profileService: ProfileService) {
  }

  ngOnInit() {
  }
}
