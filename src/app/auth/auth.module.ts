import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AuthService} from '../common/services/auth.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from './environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {UserModel} from '../common/models/UserModel';



const routes: Routes = [
  { path: '', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'sign-up', component: SignUpComponent}
    ]}
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
    AuthComponent,
    LoginComponent,
    SignUpComponent
  ],
  providers: [HttpModule, UserModel],
})
export class AuthModule { }
