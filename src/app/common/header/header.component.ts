import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  openConfirmWindow = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  logOut() {
    this.authService.logOut();
  }
  openConfirmDialog() {
    this.openConfirmWindow = !this.openConfirmWindow;
  }
}

