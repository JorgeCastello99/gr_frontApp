import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-userhandler',
  templateUrl: './userhandler.component.html',
  styleUrls: ['./userhandler.component.scss']
})
export class UserhandlerComponent implements OnInit {
  user: any;

  constructor( private router: Router, private cookieService: CookieService, public jwthelper: JwtHelperService, private userService: UserService) { }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    const decoded = this.jwthelper.decodeToken(token);
    this.userService.getUser(decoded.sub).subscribe(data => {
      this.user = data

      if (this.user.role == "school-admin" ) {
        this.router.navigateByUrl('/platform/school-admin/gestion')

      }
      else if(this.user.role == "teacher" ){
        this.router.navigateByUrl('/platform/teacher/clases')

      }
      else{
        this.router.navigateByUrl('/platform/home')
      }
    })
  }

  checkJwt(){
  }
}
