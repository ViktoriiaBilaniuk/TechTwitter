import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate(): boolean {
    // console.log(this.authService.success);
    //return this.authService.success;
    return true;
  }




}
