import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PersonalInfoComponent } from './components/profile/personal-info/personal-info.component';
import { KfComponent } from './components/kf/kf.component';
import { AuthComponent } from './auth/auth.component';
import { TimelineComponent } from './layout/profile/timeline/timeline.component';
import { FriendsComponent } from './layout/profile/friends/friends.component';
import { TimelineItemComponent } from './layout/profile/timeline/timeline-item/timeline-item.component';
import { NewPostComponent } from './layout/profile/timeline/new-post/new-post.component';
import { FriendsItemComponent } from './layout/profile/friends/friends-item/friends-item.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    HeaderComponent,
    UsersComponent,
    ProfileComponent,
    PersonalInfoComponent,
    KfComponent,
    AuthComponent,
    TimelineComponent,
    FriendsComponent,
    TimelineItemComponent,
    NewPostComponent,
    FriendsItemComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
