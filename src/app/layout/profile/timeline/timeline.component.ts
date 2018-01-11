import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../common/services/profile.service';
import {PostModel} from '../../../common/models/PostModel';
import {UserModel} from '../../../common/models/UserModel';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  postsOfCurrentUser: PostModel[] = [];
  currentUser = new UserModel;
  currentUserId: any;
  noPosts = false;

  constructor(public profileService: ProfileService, private spinnerService: Ng4LoadingSpinnerService) {}

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('CurrentUserId'));
    this.profileService.getCurrentUser(this.currentUserId)
      .subscribe(currentUser => {
        this.currentUser = currentUser.payload.val();
        this.currentUser.userId = currentUser.payload.key;
        this.getPosts();
      });
  }

  getPosts() {
    this.spinnerService.show();
    this.profileService.fetchPosts(this.currentUser.userId)
      .subscribe((posts) => {
        this.postsOfCurrentUser = posts.map((post) => post.payload.val());
        if (this.postsOfCurrentUser.length === 0) {
          this.noPosts = true;
        } else {
          this.noPosts = false;
        }
        this.spinnerService.hide();
      });
  }
}
