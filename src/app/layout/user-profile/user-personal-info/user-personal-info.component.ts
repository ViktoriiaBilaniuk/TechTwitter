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
      this.profileService.getUser(this.userId)
        .subscribe((user) => {
          this.user = user.payload.val();
        });
    });
  }

  addFriend() {
    console.log(this.currentUser.followers);
    console.log(this.userId);
    this.profileService.addNewFollower(this.currentUser, this.userId);
  }
}
