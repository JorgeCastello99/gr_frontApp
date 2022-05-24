import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './../../services/user/user.service';
import { NavigationStart, Router, NavigationEnd, ActivationStart } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-menu-a',
  templateUrl: './menu-a.component.html',
  styleUrls: ['./menu-a.component.scss']
})
export class MenuAComponent implements OnInit {


  home = "Home"
  gr = "GROWTHROAD"
  perfil = "Mi perfil"
  orientation = ""
  vcoach = ""
  gestion= ""
  clases= ""
  mlContainerToggle = "1%"
  mrContainerToggle = "1%"
  idUser: any
  @ViewChild('inptoggle')
  public inpToggle: ElementRef | undefined;
  user: any;




  constructor(private cookieService: CookieService, private router: Router, private userService: UserService, private jwthelper: JwtHelperService) {
    this.gestion= "Gestión"
   }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    const decoded = this.jwthelper.decodeToken(token);
    this.userService.getUser(decoded.sub).subscribe(data => {
      console.log(data)
        this.user=data
        this.userService.updateCodes(data._id).subscribe(data=>{

        })
    })
  }
  checkCodeKeys(){

  }

  goX(){
    this.mrContainerToggle = "1%"
    this.mlContainerToggle = "1%"
    if(this.inpToggle) {
      this.inpToggle.nativeElement.checked = false
    }
  }

  onToggle(e: any) {
    console.log(e.target.checked)
    if(e.target.checked){
      if(window.innerWidth >= 703){
        this.mrContainerToggle = "-26%"
        this.mlContainerToggle = "26%"
      } else if(window.innerWidth < 703 && window.innerWidth >= 595){
        this.mrContainerToggle = "-32%"
        this.mlContainerToggle = "32%"
      } else if(window.innerWidth < 595 && window.innerWidth >= 490){
        this.mrContainerToggle = "-38%"
        this.mlContainerToggle = "38%"
      } else if(window.innerWidth < 490 && window.innerWidth >= 410){
        this.mrContainerToggle = "-44%"
        this.mlContainerToggle = "44%"
      } else if(window.innerWidth < 410 && window.innerWidth >= 330){
        this.mrContainerToggle = "-55%"
        this.mlContainerToggle = "55%"
      } else if(window.innerWidth < 330 && window.innerWidth >= 270){
        this.mrContainerToggle = "-65%"
        this.mlContainerToggle = "65%"
      } else if(window.innerWidth < 270 && window.innerWidth >= 0){
        this.mrContainerToggle = "-72%"
        this.mlContainerToggle = "72%"
      }

    } else {
      this.mrContainerToggle = "1%"
      this.mlContainerToggle = "1%"

    }
  }
  onClose() {
    this.cookieService.deleteAll()
    this.router.navigate(["/"])
  }
}
