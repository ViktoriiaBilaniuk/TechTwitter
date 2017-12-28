import { Injectable } from '@angular/core';
import {UserModel} from '../models/UserModel';

@Injectable()
export class ProfileService {
  currentUser: UserModel;

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    console.log(this.currentUser);
  }

}
