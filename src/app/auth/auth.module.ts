import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {MatButtonModule, MatCheckboxModule,MatInputModule} from '@angular/material';
import { SignUpComponent } from './sign-up/sign-up.component';



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
    MatButtonModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    SignUpComponent
  ]
})
export class AuthModule { }
