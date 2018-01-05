import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TimelineComponent } from './layout/profile/timeline/timeline.component';
import { FriendsComponent } from './layout/profile/friends/friends.component';
import { NewPostComponent } from './layout/profile/timeline/new-post/new-post.component';
import { FriendsItemComponent } from './layout/profile/friends/friends-item/friends-item.component';
import { UserProfileComponent } from './layout/user-profile/user-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {UsersComponent} from './layout/users/users.component';
import {HeaderComponent} from './common/header/header.component';
import { UserPersonalInfoComponent } from './layout/user-profile/user-personal-info/user-personal-info.component';
import {AuthModule} from './auth/auth.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from './common/services/auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireModule} from 'angularfire2';
import {environment} from './auth/environments/environment';
import {AuthGuard} from './auth/auth.guard';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {ProfileComponent} from './layout/profile/profile.component';
import {PersonalInfoComponent} from './layout/profile/personal-info/personal-info.component';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatDialogModule, MatGridListModule, MatInputModule, MatListModule,
  MatMenuModule
} from '@angular/material';
import {ProfileService} from './common/services/profile.service';
import {UserTimelineComponent} from './layout/user-profile/user-timeline/user-timeline.component';
import {FilterPipe} from './layout/users/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    FriendsComponent,
    NewPostComponent,
    FriendsItemComponent,
    UserProfileComponent,
    UsersComponent,
    HeaderComponent,
    UserPersonalInfoComponent,
    ProfileComponent,
    HeaderComponent,
    ProfileComponent,
    NewPostComponent,
    UserProfileComponent,
    UsersComponent,
    PersonalInfoComponent,
    UserTimelineComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
