import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../common/models/UserModel';
import {ProfileService} from '../../../common/services/profile.service';
import * as firebase from 'firebase';
import {AuthService} from '../../../common/services/auth.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  currentUser: UserModel;
  image: ImageBitmap;

  constructor(public profileService: ProfileService, public authService: AuthService) {
    this.authService.userValue.subscribe((user) => {
      console.log('me here');
      console.log(user); // this will happen on every change
    });
  }

  ngOnInit() {
    // this.currentUser = this.profileService.getCurrentUser();
  }


  uploadPhoto(e) {
    const images = e.target.files;
    const image = images[0];
    console.log(images);
    console.log(image);
    // document.getElementsByClassName('photo')[0].style.backgroundImage = image;
  }




}
