import {Component, OnInit, ViewChild} from '@angular/core';
import {PostModel} from '../../../../common/models/PostModel';
import {ProfileService} from '../../../../common/services/profile.service';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../../../common/models/UserModel';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  currentPost = new PostModel;
  currentUserId: any;
  currentUser: UserModel;

  /* for image upload */

  iconColor = '#ccc';
  overlayColor = 'rgba(255,255,255,0.5)';
  loaded = false;
  imageLoaded = false;
  imageSrc = '';

  constructor(public profileService: ProfileService, private http: HttpClient) {
  }

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('CurrentUserId'));
    this.profileService.getCurrentUser(this.currentUserId)
      .subscribe(currentUser => {
        this.currentUser = currentUser.payload.val();
        this.currentUser.userId = currentUser.payload.key;
      });
  }

  postText() {
    this.initCurrentPost();
    this.http.post('https://techtwitter2018.firebaseio.com/walls.json', {
      userId: this.currentPost.userId,
      text: this.currentPost.text,
      createdAt: this.currentPost.createdAt,
      hour: this.currentPost.hour,
      day: this.currentPost.day,
      month: this.currentPost.month,
      image: this.currentPost.image
    })
      .subscribe(
        res => {
          console.log('Post success' + res);
        },
        err => {
          console.log('Error occured');
        }
      );
    this.currentPost.text = '';
    this.closeImage();
  }

  initCurrentPost() {
    this.currentPost.userId = this.currentUser.userId;
    this.currentPost.createdAt = this.getCurrentTime();
    this.currentPost.hour = this.getTime();
    this.currentPost.day = this.getDay();
    this.currentPost.month = this.getMonth();
    this.currentPost.image = this.getImage();
  }

  getCurrentTime() {
    const newDate = new Date();
    return newDate;
  }

  addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  getTime() {
    const d = new Date();
    const h = this.addZero(d.getHours());
    const m = this.addZero(d.getMinutes());
    const time = h + ':' + m;
    return time;
  }
  getDay() {
    const d = new Date;
    return d.getDay();
  }
  getMonth() {
    const d = new Date();
    const month = new Array();
    month[0] = 'January';
    month[1] = 'February';
    month[2] = 'March';
    month[3] = 'April';
    month[4] = 'May';
    month[5] = 'June';
    month[6] = 'July';
    month[7] = 'August';
    month[8] = 'September';
    month[9] = 'October';
    month[10] = 'November';
    month[11] = 'December';
    const n = month[d.getMonth()];
    return n;
  }

  /*work with image upload*/

  handleImageLoad() {
    this.imageLoaded = true;
    this.iconColor = this.overlayColor;
  }

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
  }

  getImage() {
    console.log(this.imageSrc);
    return this.imageSrc;
  }

  closeImage() {
    this.imageSrc = '';
  }
}
