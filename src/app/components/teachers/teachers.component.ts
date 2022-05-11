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
  gradesList: Array<any> = []
  studentsList: any
  selectedIndex: any = 0
  contentModal: any
  listAdd: string[] = []
  email: string = ""
  modalError = ""
  letter = ""
  course = ""
  courseError: any
  school: School = new School()

  idGr: any
  user: User = new User()
  idSc: any
  idGrUser: any
  role: any

  constructor(private router: Router, public jwthelper: JwtHelperService, private cookieService: CookieService, private schoolService: SchoolService, private mailService: MailersService, private gradeService: GradesService, private userService: UserService, private dataUserService: DataUserService, private modalService: NgbModal,) {

  }

  ngOnInit(): void {
    // Hacerlo por cookies
    const token = this.cookieService.get('token');
    const decoded = this.jwthelper.decodeToken(token);
    this.userService.getUser(decoded.sub).subscribe(data => {
      this.user = data
      this.idGrUser = this.user.grade
      this.idSc = this.user.school
      this.role = this.user.role
      if (this.role == "teacher") {
        this.gradeService.getGradesBySchool(this.idSc).subscribe((data: any) => {

          const z = data
          this.idGrUser = this.user.grade

          const c = z.find((d: any) => d._id == this.idGrUser)
          this.gradesList.push(c)
          this.userService.getUsersByGrade(this.idGrUser).subscribe((data: any) => {
            const x = data
            const z = x.filter((d: any) => d.role == "student")
            console.log(z)
            this.studentsList = z
            this.selectedIndex = 0
          })
        })

      } else if (this.role == "school-admin") {
        this.gradeService.getGradesBySchool(this.idSc).subscribe((data: any) => {
          this.gradesList = data
        })
      } else {
        this.router.navigate(["/home"])
      }
      this.schoolService.getSchool(this.idSc).subscribe((data: any) => {
        this.school = data
      })
    })
    console.log(this.idGrUser)
    console.log(this.idSc)
    console.log(this.role)
    this.idSc = this.user.school

  }

  sendTeachers() {
    if (this.listAdd.length > 0) {
      console.log(this.idGr)
      this.listAdd.map(destination => {
        const mail: Mail = new Mail()
        mail.destination = destination
        mail.idSc = this.idSc
        mail.idGr = this.idGr
        mail.role = "teacher"
        //mail.license = "B" NO ES NECESARIO DADO COMO ESTA HECHO EN BACK
        this.mailService.sendUrl(mail).subscribe((data: any) => {
          this.modalError = ""
        }, error => {
          this.modalError += error.error
        })
      })
      this.listAdd = []
    }

  }
  sendStudents() {
    this.idGr = this.idGrUser
    if (this.listAdd.length > 0) {
      console.log(this.listAdd)
      this.listAdd.map(destination => {
        const mail: Mail = new Mail()
        mail.destination = destination
        mail.idSc = this.idSc
        mail.role = "student"
        //mail.license = "B"
        if(this.user.role == "teacher"){
          mail.idGr = this.idGrUser
        } else {
          mail.idGr = this.idGr
        }


        this.mailService.sendUrl(mail).subscribe((data: any) => {
          this.modalError = ""
        }, error => {
          console.log(error)
          this.modalError += error.error
        })
      })
      this.listAdd = []
    }
  }

  emptyList() {
    this.listAdd = []
  }

  onAddGrade() {
    if (this.course) {
      console.log(this.idSc)
      const grade: Grade = new Grade()
      grade.course = this.course
      grade.letter = this.letter.toUpperCase()
      grade.idSc = this.idSc
      console.log(grade)
      this.gradeService.registerGrade(grade).subscribe((data: any) => {
        console.log("eeee")
        this.gradesList.push(grade)
      })
    }

  }
  onAdd() {
    if (this.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) && !this.listAdd.find(data => data == this.email)) {
      this.modalError = ""
      this.listAdd.push(this.email)
      this.email = ""
    } else if (this.listAdd.find(data => data == this.email)) {
      this.modalError = "Escribe un email que no esté en la lista."
    }
    else {
      this.modalError = "Escribe un email válido."
    }

  }

  onChangeGrade(idGrade: any, active: number) {
    this.userService.getUsersByGrade(idGrade).subscribe((data: any) => {
      const x = data
      const z = x.filter((d: any) => d.role == "student")
      console.log(z)
      this.studentsList = z
      this.selectedIndex = active
    })
  }

  onDeleteGrade(id: any) {
    let deletet
    deletet = confirm("¿Estás seguro de querer borrar esta clase?")
    if (deletet) {
      this.gradeService.deleteGrade(id).subscribe(data => {
        this.gradeService.getGradesBySchool(this.idSc).subscribe((data: any) => {
          this.gradesList = data
        })
      }, error => {

      })
    }
  }

  onShowModal(content: any, $event: any) {
    this.email = ""
    this.listAdd = []
    this.contentModal = $event.target.value
    this.open(content)

  }

  open(content: any) {
    this.modalService.open(content);
  }
}
