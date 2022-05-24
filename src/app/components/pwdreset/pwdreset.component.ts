import { Router } from '@angular/router';
import { MailersService } from './../../services/mail/mailers.service';
import { UserService } from 'src/app/services/user/user.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-pwdreset',
  templateUrl: './pwdreset.component.html',
  styleUrls: ['./pwdreset.component.scss']
})
export class PwdresetComponent implements OnInit {
  email = ""
  userId = ""
  num = 1
  emailError = ""
  code = ""
  pwd1 = ""
  pwd2 = ""
  userName = ""
  userToken = ""
  pwdVis2 = false
  pwdVis1 = false
  codeChecked = false
  constructor(private userService: UserService,
   private mailService: MailersService,
   private router: Router) { }

  ngOnInit(): void {

  }

  toggleVisibility(i: Number){
    if(i === 1){
      this.pwdVis1 = !this.pwdVis1
    } else {
      this.pwdVis2 = !this.pwdVis2
    }
  }

  resend(){
    this.mailService.sendEmailPwd(this.userName, this.userToken, this.email).subscribe(res=>{
      console.log(res)
    },
    error=>{
      this.emailError = error
    })
  }

  postPwd(){
    let longitud1: number
    longitud1 = this.pwd1.length
    let longitud2: number
    longitud2 = this.pwd2.length
    if (!this.pwd1.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$") && longitud1 != 0 && !this.pwd2.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$") && longitud2 != 0) {
      this.emailError = "Longitud entre 8 y 20 caracteres, al menos una letra mayúscula, una letra minúscula y un número"
    } else if (longitud1 >= 8 && longitud1 <= 20 && longitud2 >= 8 && longitud2 <= 20 && this.pwd1.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$") && this.pwd2.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$")) {
      console.log("3")
      if (this.pwd1 === this.pwd2) {
        this.emailError = ""
        console.log("2")
        console.log(this.codeChecked)
        if(!this.emailError && this.codeChecked){
          console.log("1")
          this.userService.updatePassword(this.userId,this.pwd1).subscribe(data=>{
            console.log(data)

            this.router.navigate(["/"])
          },error=>{
            this.emailError = error.error
          })
        }
      } else {
        this.emailError = "Las contraseñas deben coincidir"
      }
    } else if(longitud1 == 0 || longitud2 == 0){
      this.emailError = "Escribe una contraseña válida"
    } else {
      this.emailError = "Espera un tiempo o bien si este problema persiste ponte en contacto con nosotros."
    }
  }
  checkCode(){
    this.userService.checkCodePwd(this.userId,this.code).subscribe(data=>{
      if(data.result === true){
        this.num++
        this.codeChecked = true
      } else {
        this.emailError = "Código fallido"
        this.codeChecked = false
      }
    },error=>{
      this.emailError = error.error
      this.codeChecked = false
    })
  }
  sendEmail(){
    let longitud: number
    longitud = this.email.length
    if (!this.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && longitud != 0) {
      this.emailError = "Escribe un email válido"
    } else if(longitud == 0){
      this.emailError = "Escribe un email válido"

    } else {
      this.emailError = ""
      this.userService.forgotPassword(this.email).subscribe(data=>{
        console.log(data)

        this.userId = data.userId
        this.userToken = data.token
        this.userName = data.name
        this.num++
        this.mailService.sendEmailPwd(this.userName, this.userToken, this.email).subscribe(res=>{
          console.log(res)


        },
        error=>{
          this.emailError = error
        })
        //enviar correo con el data token y data name
      },error=>{
        console.log(error)
        this.emailError = error.error
        this.email = ""
      })

    }




  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.code == "Enter"){
      this.sendEmail()
    }
  }

}
