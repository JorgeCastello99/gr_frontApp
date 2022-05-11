import { UserService } from './../../services/user/user.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Login } from '../../models/login.model';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';


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
  constructor(private userService: UserService,  private router: Router, private modalService: NgbModal, private cookieService: CookieService) { }

  ngOnInit(): void {

  }

  onLogin(){
    const login: Login = new Login()
    login.email = this.uname
    login.password = this.pword
    this.userService.loginUser(login).subscribe((data: any) => {
      console.log(data)
      if(this.remember){
        // localStorage.setItem("remember", "true")
        this.cookieService.set("remember", "true")
      } else{
        // localStorage.setItem("remember", "false")
        this.cookieService.set("remember", "false")
      }
      this.cookieService.set("token", data.access_token)

      this.router.navigateByUrl('/platform/home')
    },
    error => {
      this.txtErr = error.error
      alert(this.txtErr)
      // this.open(content)
    })
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
