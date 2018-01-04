import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../../../common/services/profile.service';
import {UserModel} from '../../../common/models/UserModel';

@Component({
  selector: 'app-user-personal-info',
  templateUrl: './user-personal-info.component.html',
  styleUrls: ['./user-personal-info.component.css']
})
export class UserPersonalInfoComponent implements OnInit {
  private sub: any;
  userId: string;
  user = new UserModel;
  constructor(public route: ActivatedRoute, public profileService: ProfileService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.profileService.getUser(this.userId)
        .subscribe((user) => {
          this.user = user.payload.val();
        });
    });
  }
}
