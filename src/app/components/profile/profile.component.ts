import { AngularFireStorage } from '@angular/fire/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { DataUserService } from 'src/app/services/user/data-user.service';
import { UserService } from 'src/app/services/user/user.service';
import * as moment from 'moment';
import 'moment/locale/es';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any
  dateGr: any
  userName: any
  userSurName: any
  userLicense: any
  userEmail: any
  optionConfig: any
  animUpdName = false
  animUpdEm = false
  animUpdPw = false
  animUpdSc = false
  upName = ""
  upSurName = ""
  upEmail = ""
  upPwdCheck = ""
  upPwdOld = ""
  upPwdNew = ""
  upPwdNewR = ""
  errorSh = ""
  showPwdCheck = "none"
  showPwdCheckk = "block"
  codeSchool = ""
  //Derecha
  configShow = false
  emailShow: any
  uploadPercent: any
  urlImage: any
  filepath: any;
  file: any;
  task: any;
  ref: any;
  currentImage: any
  image: any;
  photoURL: any
  constructor(public storage: AngularFireStorage, private cookieService: CookieService, private jwthelper: JwtHelperService, private userService: UserService) { }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    const decoded = this.jwthelper.decodeToken(token);
    this.userService.getUser(decoded.sub).subscribe(data => {
      this.userName = data.name
      this.userSurName = data.surname
      this.dateGr = moment(data.createdDate).format("DD-MM-YYYY")
      this.userLicense = data.license
      this.user = data
      this.filepath = `update/profile_${this.user._id}`
      this.ref = this.storage.ref(this.filepath)
      this.urlImage = this.ref.getDownloadURL()
    })
  }

    upload(event: any) {
    this.file = event.target.files[0];
    this.filepath = `update/profile_${this.user._id}`
    this.ref = this.storage.ref(this.filepath)
    this.task = this.storage.upload(this.filepath, this.file)
    this.uploadPercent = this.task.percentageChanges()

    this.task.snapshotChanges().pipe(finalize(() => this.urlImage = this.ref.getDownloadURL())).subscribe();
  }

  setUserData(i: number) {
    if (i === 1) {
      let longitud1: number
      let longitud2: number
      longitud2 = this.upSurName.length
      longitud1 = this.upName.length
      if (longitud1 == 0 && longitud2 == 0) {
      } else if (longitud2 == 0) {
        if (!this.upName.match("^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$")) {
          this.errorSh = "Carácter inválido en el nombre"
        } else if (longitud1 >= 2 && longitud1 < 20) {
          this.errorSh = ""
          //Update
        } else if (longitud1 < 2 && longitud1 > 0) {
          this.errorSh = "El nombre debe tener al menos 2 caracteres"
        } else {
          this.errorSh = ""
          //Update
        }
      } else if (longitud1 == 0) {
        if (!this.upSurName.match("^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$")) {
          this.errorSh = "Carácter inválido en los apellidos"
        } else if (longitud2 >= 2 && longitud2 < 30) {
          this.errorSh = ""
          //Update
        } else if (longitud2 < 2 && longitud2 > 0) {
          this.errorSh = "Los apellidos deben tener al menos 2 caracteres"
        } else {
          this.errorSh = ""
          //Update
        }
      } else {
        if (!this.upSurName.match("^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$") && !this.upName.match("^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$")) {
          this.errorSh = "Carácter inválidos"
        } else if (longitud2 >= 2 && longitud2 < 30 && longitud1 >= 2 && longitud1 < 20) {
          this.errorSh = ""
          //Update
        } else if (longitud2 < 2 && longitud2 > 0 && longitud1 < 2 && longitud1 > 0) {
          this.errorSh = "Deben tener al menos 2 caracteres"
        } else {
          this.errorSh = ""
          //Update
        }
      }
      if (this.errorSh == "") {
        this.userService.updateUserName(this.user._id, this.upName, this.upSurName).subscribe(data => {
          this.ngOnInit()
          this.animUpdName = false
          this.upName = ""
          this.upSurName = ""
        }, error => {
          console.log(error)
          this.errorSh = error
        })
      }
    } else if (i === 2) {
      //Checkear el nuevo correo
      if (!this.upEmail.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) || this.upEmail == "") {
        this.errorSh = "Escribe un email válido"
      } else {
        this.errorSh = ""
        this.showPwdCheck = "block"
        this.showPwdCheckk = "none"
      }
    } else if (i === 3) {
      //Cambiar contraseña
      let longitud1: number
      let longitud2: number
      let longitud3: number
      longitud1 = this.upPwdOld.length
      longitud2 = this.upPwdNew.length
      longitud3 = this.upPwdNewR.length
      if (longitud1 > 7 && this.upPwdOld.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$")) {
        if ((!this.upPwdNew.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$") && longitud2 != 0) || (!this.upPwdNewR.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$") && longitud3 != 0)) {
          this.errorSh = "Longitud entre 8 y 20 caracteres, al menos debe contener una letra mayúscula, una letra minúscula y un número"
        } else if (longitud2 >= 8 && longitud2 <= 20 && longitud3 >= 8 && longitud3 <= 20) {
          this.errorSh = ""
          this.userService.updatePwdCheck(this.user._id, this.upPwdOld, this.upPwdNew, this.upPwdNewR).subscribe(result => {
            console.log(result)
            this.animUpdPw = false
            this.upPwdNew = ""
            this.upPwdOld = ""
            this.upPwdNewR = ""
          }, error => {
            console.log(error)
            this.errorSh = error.error
          })
        }
      } else {
        this.errorSh = "Escribe una contraseña válida"
      }

    } else if (i === 4) {
      let longitud: Number
      longitud = this.upPwdCheck.length
      //Mandar el correo para que se cambie el correo
        if ((!this.upPwdCheck.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$") || longitud == 0) ) {
          this.errorSh = "Longitud entre 8 y 20 caracteres, al menos debe contener una letra mayúscula, una letra minúscula y un número"
        } else if (longitud >= 8 && longitud <= 20) {
          this.errorSh = ""
          //Meter aqui lo de enviar el correo
        }

    }
  }

  updAnim(i: Number) {
    this.errorSh = ""
    this.upName = ""
    this.upSurName = ""
    this.upEmail = ""
    this.upPwdCheck = ""
    this.upPwdOld = ""
    this.upPwdNew = ""
    this.upPwdNewR = ""
    this.errorSh = ""
    this.showPwdCheck = "none"
    this.showPwdCheckk = "block"
    if (i === 1) {
      this.animUpdName = !this.animUpdName
      this.animUpdEm = false
      this.animUpdPw = false
      this.animUpdSc = false
    } else if (i === 2) {
      this.animUpdEm = !this.animUpdEm
      this.animUpdName = false
      this.animUpdPw = false
      this.animUpdSc = false
    } else if (i === 3) {
      this.animUpdPw = !this.animUpdPw
      this.animUpdName = false
      this.animUpdEm = false
      this.animUpdSc = false
    } else if (i === 4) {
      this.animUpdSc = !this.animUpdSc
      this.animUpdName = false
      this.animUpdEm = false
      this.animUpdPw = false
    }
  }
  removeAnim(i: Number) {
    this.errorSh = ""
    this.upName = ""
    this.upSurName = ""
    this.upEmail = ""
    this.upPwdCheck = ""
    this.upPwdOld = ""
    this.upPwdNew = ""
    this.upPwdNewR = ""
    this.errorSh = ""
    this.showPwdCheck = "none"
    this.showPwdCheckk = "block"
    if (i === 1) {
      this.animUpdName = false
    } else if (i === 2) {
      this.animUpdEm = false
    } else if (i === 3) {
      this.animUpdPw = false
    } else if (i === 4) {
      this.animUpdSc = false
    }
  }
  setConfig(i: Number) {
    this.optionConfig = i
    this.configShow = true
  }
  quitConfig() {
    this.configShow = false
    this.emailShow = false
  }

  sendEmail() {
    this.emailShow = true
  }

  onContact() {
    this.optionConfig = 1
  }
}
