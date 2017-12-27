import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../../common/models/UserModel';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  user: UserModel;

  constructor() { }

  ngOnInit() { }



}
