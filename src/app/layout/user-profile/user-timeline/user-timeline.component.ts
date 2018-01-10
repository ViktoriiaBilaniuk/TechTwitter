import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../../common/services/profile.service';
import {PostModel} from '../../../common/models/PostModel';
import {UserModel} from '../../../common/models/UserModel';
import {ActivatedRoute} from '@angular/router';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.scss']
})
export class UserTimelineComponent implements OnInit {
  postsOfCurrentUser: PostModel[] = [];
  private sub: any;
  userId = '';
  user = new UserModel;
  noPosts = false;

  constructor(public profileService: ProfileService, public route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.profileService.getUser(this.userId)
        .subscribe((user) => {
          this.user = user.payload.val();
          this.getPosts();
        });
    });
  }

  getPosts() {
    this.spinnerService.show();
    this.profileService.fetchPosts(this.userId)
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
