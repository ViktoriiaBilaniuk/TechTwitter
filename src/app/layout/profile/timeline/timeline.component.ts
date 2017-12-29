import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../common/services/profile.service';
import {PostModel} from '../../../common/models/PostModel';
import {AuthService} from '../../../common/services/auth.service';
import {UserModel} from '../../../common/models/UserModel';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  postsOfCurrentUser: PostModel[] = [];
  currentUser: UserModel;

  constructor(public profileService: ProfileService, private authService: AuthService) {
    this.authService.userValue.subscribe((user) => {
      this.currentUser = user;
      this.getPosts();
    });
  }

  ngOnInit() {

  }

  getPosts() {
    this.profileService.fetchPosts(this.currentUser.userId)
      .subscribe((posts) => {
        this.postsOfCurrentUser = posts.map((post) => post.payload.val());
      });
  }
}
