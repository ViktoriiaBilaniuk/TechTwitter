import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../common/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService) {
  }

  canActivate(): boolean {
    console.log(this.authService);
     // return this.authService.success;
     return true;
  }




}
