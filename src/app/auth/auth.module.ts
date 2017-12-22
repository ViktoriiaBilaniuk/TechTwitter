import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {RegistrationComponent} from './registration/registration.component';
import {LoginComponent} from './login/login.component';



const routes: Routes = [
  { path: '', component: AuthComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent}
    ]}
];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent
  ]
})
export class AuthModule { }
