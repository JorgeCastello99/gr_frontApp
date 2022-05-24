import { SchoolService } from './../../services/school/school.service';
import { User } from 'src/app/models/user.model';
import { DataUserService } from './../../services/user/data-user.service';
import { Mail } from './../../models/mail.model';
import { MailersService } from './../../services/mail/mailers.service';
import { UserService } from './../../services/user/user.service';
import { GradesService } from './../../services/grade/grades.service';
import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Grade } from 'src/app/models/grade.model';
import { School } from 'src/app/models/school.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class TeachersComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {

  }



}
