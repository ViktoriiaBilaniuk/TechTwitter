import { Component, OnInit } from '@angular/core';
import {PostModel} from '../../../../common/models/PostModel';
import {ProfileService} from '../../../../common/services/profile.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  currentPost = new PostModel;
  constructor(public profileService: ProfileService, private http: HttpClient) { }

  ngOnInit() {
  }

  postText() {
    this.initCurrentPost();
    this.http.post('https://techtwitter2018.firebaseio.com/walls.json', {
      userId: this.currentPost.userId,
      text: this.currentPost.text,
      createdAt: this.currentPost.createdAt
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
    this.currentPost.text = '';
  }

  initCurrentPost() {
    this.currentPost.userId = this.profileService.getCurrentUser().userId;
    this.currentPost.createdAt = this.getCurrentTime();
  }
  getCurrentTime() {
    let newDate = new Date();
    return newDate;
  }


}
