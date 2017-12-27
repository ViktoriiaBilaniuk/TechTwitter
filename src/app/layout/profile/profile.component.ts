import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../common/models/UserModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserModel;

  constructor() { }

  ngOnInit() {
  }

}
