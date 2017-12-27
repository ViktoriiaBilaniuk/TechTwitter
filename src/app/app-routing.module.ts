import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './layout/users/users.component';
import {UserProfileComponent} from './layout/user-profile/user-profile.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './auth/auth.guard';
import {ProfileComponent} from './layout/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full'},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'users', component: UsersComponent},
  { path: 'user/:id', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
