import { UserService } from './../../services/user/user.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Login } from '../../models/login.model';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ScriptElementKindModifier } from 'typescript';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class LoginComponent implements OnInit {
  hide = true
  uname: string = ""
  pword: string = ""
  remember: any
  txtErr: any
  showPass = false
  user: any;
  name: any;
  constructor(public jwthelper: JwtHelperService, private userService: UserService,  private router: Router, private modalService: NgbModal, private cookieService: CookieService) { }

  ngOnInit(): void {

  }

  onLogin(){
    const login: Login = new Login()
    login.email = this.uname
    login.password = this.pword
    this.userService.loginUser(login).subscribe((data: any) => {

      if(this.remember){
        // localStorage.setItem("remember", "true")
        this.cookieService.set("remember", "true")
      } else{
        // localStorage.setItem("remember", "false")
        this.cookieService.set("remember", "false")
      }
      this.cookieService.set("token", data.access_token)


      this.router.navigateByUrl('/platform')

    },
    error => {
      this.txtErr = error.error
      alert(this.txtErr)
      // this.open(content)
    })

    const token = this.cookieService.get('token');
    const decoded = this.jwthelper.decodeToken(token);
  }

  open(content: any) {
    this.modalService.open(content);
  }

  onTogglePass(){
    this.showPass = !this.showPass
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.code == "Enter"){
      this.onLogin()
    }
  }

}
