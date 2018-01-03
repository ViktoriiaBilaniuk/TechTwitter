import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  confirmLogout = false;
  openConfirmWondow = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  logOut() {
    this.authService.logOut();
  }
  openConfirmDialog() {
    this.openConfirmWondow = !this.openConfirmWondow;
  }


}

