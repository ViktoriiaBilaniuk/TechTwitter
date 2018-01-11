import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../common/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('CurrentUser')) {
      return true;
    } else {
      this.router.navigate(['./auth/login']);
      return false;
    }
  }
}
