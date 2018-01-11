import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../common/environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {UserModel} from '../common/models/UserModel';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCheckboxModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  providers: [HttpModule, UserModel],
})
export class AuthModule { }
