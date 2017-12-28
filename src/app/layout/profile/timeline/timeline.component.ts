import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../common/services/profile.service';
import {PostModel} from '../../../common/models/PostModel';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  postsOfCurrentUser: PostModel[] = [];

  constructor(public profileService: ProfileService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.profileService.fetchPosts(this.profileService.currentUser.userId)
      .subscribe((posts) => {
        this.postsOfCurrentUser = posts.map((post) => post.payload.val());
        // this.postsOfCurrentUser[0] = posts[0].payload.val();
        // console.log(posts);
      });
  }
}
