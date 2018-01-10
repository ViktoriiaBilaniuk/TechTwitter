import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../../common/services/profile.service';
import {UserModel} from '../../../common/models/UserModel';

@Component({
  selector: 'app-user-personal-info',
  templateUrl: './user-personal-info.component.html',
  styleUrls: ['./user-personal-info.component.scss']
})
export class UserPersonalInfoComponent implements OnInit {
  private sub: any;
  userId = '';
  user = new UserModel;
  currentUser = new UserModel;
  currentUserId: any;
  numberOfPosts: number;
  isFriendOfCurrentUser: boolean;
  buttonText = 'Add friend';
  constructor(public route: ActivatedRoute, public profileService: ProfileService) { }

  ngOnInit() {
    this.currentUserId = JSON.parse(localStorage.getItem('CurrentUserId'));
    this.profileService.getCurrentUser(this.currentUserId)
      .subscribe(currentUser => {
        this.currentUser = currentUser.payload.val();
        this.currentUser.userId = currentUser.payload.key;
      });
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.isFriendOfCurrentUser = params['isFriend'];
      this.getButtonText();
      this.getNumberOfPosts(this.userId);
      this.profileService.getUser(this.userId)
        .subscribe((user) => {
          this.user = user.payload.val();
        });
    });
  }
  getNumberOfPosts(userId) {
    this.profileService.fetchPosts(userId)
      .subscribe(posts => {
          this.numberOfPosts = posts.length;
        }
      );
  }

  addFriend() {
    this.profileService.addNewFollower(this.currentUser, this.userId);
  }

  disableButton() {
    return this.isFriendOfCurrentUser;
  }

  getButtonText() {
    return this.isFriendOfCurrentUser ? this.buttonText = 'Your friend' : this.buttonText = 'Add friend';
  }

}
