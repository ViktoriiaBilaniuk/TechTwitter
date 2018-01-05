import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../common/services/profile.service';
import {AuthService} from '../../../common/services/auth.service';
import {UserModel} from '../../../common/models/UserModel';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  currentUser = new UserModel;
  image: ImageBitmap;
  currentUserId: any;
  numberOfPosts: any;

  constructor(public profileService: ProfileService, public authService: AuthService) {}

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('CurrentUserId'));
    this.profileService.getCurrentUser(this.currentUserId)
      .subscribe(currentUser => {
        this.currentUser = currentUser.payload.val();
        this.getNumberOfPosts(currentUser.key);
      });
  }


  uploadPhoto(e) {
    const images = e.target.files;
    const image = images[0];
    console.log(images);
    console.log(image);
    // document.getElementsByClassName('photo')[0].style.backgroundImage = image;
  }

  getNumberOfPosts(userId) {
    this.profileService.fetchPosts(userId)
      .subscribe(posts => {
        this.numberOfPosts = posts.length;
        }
      );
  }
}
