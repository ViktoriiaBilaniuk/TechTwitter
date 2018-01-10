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
  //////
  loaded = false;
  imageSrc = '';
  /////

  constructor(public profileService: ProfileService, public authService: AuthService) {}

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('CurrentUserId'));
    this.profileService.getCurrentUser(this.currentUserId)
      .subscribe(currentUser => {
        this.currentUser = currentUser.payload.val();
        this.getNumberOfPosts(currentUser.key);
      });
  }
  getNumberOfPosts(userId) {
    this.profileService.fetchPosts(userId)
      .subscribe(posts => {
        this.numberOfPosts = posts.length;
        }
      );
  }

/* upload profile image */

  handleInputChange(e) {
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.loaded = false;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    this.loaded = true;
    this.profileService.updateProfilePhoto(this.currentUserId, this.getImage())
      .then(() => console.log('Photo changed!'))
      .catch((err) => console.log(err));
  }
  getImage() {
    return this.imageSrc;
  }
}
