import { UserparametersService } from './../../services/userparameters/userparameters.service';
import { UseranswerService } from './../../services/useranswer/useranswer.service';
import { SubthemeService } from './../../services/subtheme/subtheme.service';
import { DataUserService } from './../../services/user/data-user.service';
import { User } from 'src/app/models/user.model';
import { UserService } from './../../services/user/user.service';
import { Component, ElementRef, HostListener, Inject, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { CookieService } from 'ngx-cookie-service';
import { Color, Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { ChartType, ChartOptions, RadialChartOptions, ChartDataSets } from 'chart.js';
import { UserProgressService } from 'src/app/services/userprogress/userprogress.service';
import { DataModService } from 'src/app/services/mod/data-mod.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //Circle progreso
  prog = 0
  //plat profesores
  roleTeacher = false
  user: any
  //Nombre
  name = ""
  // primer texto
  state = "Empieza ya tu orientación."
  //Texto del circulo
  progressText = "¡Buen trabajo! Sigue así y termina el 100% de orientación."
  //Circulo
  totSubthemes = 12
  vocational = 0
  profesional = 0
  experiencies = 0
  mod1 = 0
  vocT = 0
  modList: any
  imagenArray = ["https://grapi.growthroad.es:5555/img?imgRef=cap1&ext=png", "https://grapi.growthroad.es:5555/img?imgRef=cap2&ext=png", "https://grapi.growthroad.es:5555/img?imgRef=cap3&ext=png", "https://grapi.growthroad.es:5555/img?imgRef=cap4&ext=png", "https://grapi.growthroad.es:5555/img?imgRef=cap5&ext=png", "https://grapi.growthroad.es:5555/img?imgRef=cap6&ext=png"]
  finS: any;
  finT: any;
  arrayProgressSTotal: any;
  userProgressT = [0, 0, 0, 0, 0, 0];
  userProgressS: any;
  arraybar: any;
  capitulos: any;
  subtemas: any;
  arrayProgressS = [0, 0, 0, 0, 0, 0]
  temas: any;
  idUserL: any;
  modFormat: any;
  modLS: any;
  numb = [0, 0, 0, 0, 0, 0];
  modList2: any;
  modList3: any = [];
  constructor(private userProgressService: UserProgressService, private dataModService: DataModService, private userParametersService: UserparametersService, private respondService: UseranswerService, private subthemeService: SubthemeService, private router: Router, public jwthelper: JwtHelperService, private userService: UserService, private dataUser: DataUserService, private cookieService: CookieService) {



  }

  //Dougnut(derecha)
  dougChartColors = [
    { // grey
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(0,0,0,0.1)', //este para cambiar por un morado
      pointBackgroundColor: 'rgba(0,0,0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public doughnutChartLabels: Label[] = ["Técnico-Manual", "Científico-Investigador", "Artístico-Creativo", "Social-Asistencial", "Empresarial-Persuasivo", "Administración-Gestión", "Digital/Virtual-Streamer"];
  public doughnutChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0] }
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public dougOptions: ChartOptions = {
    cutoutPercentage: 80,
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: false,
    },
    legend: {
      position: 'right',
      labels: {
        fontSize: 0,
      }
    },
    tooltips: {
      backgroundColor: '#315386'
    },


  }
  // Radar
  radarChartColors = [
    { // grey
      backgroundColor: 'rgba(242, 137, 0, 0.515)',
      borderColor: 'rgba(242, 137, 0, 0.815)', //este para cambiar por un morado
      pointBackgroundColor: 'rgba(242, 137, 0, 0.815)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    legend: {
      display: false,
    },
    scale: {
      ticks: {
        min: 0,
        max: 10,
        display: false,
      },
      pointLabels: {
        fontSize: 0,


      }

    },
    elements: {
      line: {
        borderWidth: 3
      }
    },

  };
  public radarChartLabels: Label[] = ["Técnico", "Investigador", "Emprendedor", "Comunicador", "Analista"];
  public radarChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0] },
  ];
  public radarChartType: ChartType = 'radar';
  //Ni idea
  colors: Color[] = [
    {
      backgroundColor: [
        'rgb(0, 147, 66)',
        'rgb(0, 88, 147)',
        'rgb(188, 81, 0)',
        'rgb(222, 151, 0)',
        'rgb(222, 30, 0)',
        'rgb(131, 38, 198)',
        'rgb(195, 101, 222)',
      ],

    }
  ];



  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any; }; }) {
    // event.target.innerWidth;
    this.generateFontSizeGraphs()
  }
  ngOnInit(): void {

    console.log("1")
    const token = this.cookieService.get('token');
    const decoded = this.jwthelper.decodeToken(token);
    this.idUserL = decoded.sub
    this.userService.getUser(decoded.sub).subscribe(data => {
      this.user = data
      this.name = this.user.name
      if (this.user.role == "school-admin" || this.user.role == "teacher") {
        this.roleTeacher = true
      }
    })
    this.generateFontSizeGraphs()
    this.respondService.getUserAnswerByUser(decoded.sub).subscribe(data => {
      const x = data
      this.vocational = x.length
      const z = (this.vocational / this.totSubthemes)
      this.mod1 = (z * 100)
      //Arreglar esto bien subtemas totales etc
      this.prog = ((this.vocational / this.totSubthemes) * 0.34 + (this.profesional * 0.33) + (this.experiencies * 0.33)) * 10
      const y = (this.vocational * 5) / 12
      this.vocT = parseInt(y.toFixed(1))

    }, error => {
    })

    this.userParametersService.getUserParameters(decoded.sub).subscribe(data => {
      const x: Array<number> = data.values
      const z: Array<number> = []
      x.map((l: any) => {
        z.push(Math.ceil(l))
        //z.push(l*100)
      })
      this.radarChartData[0].data = z.slice(0, 5)
      this.doughnutChartData[0].data = z.slice(5, 12)
    })

    this.userProgressService.getUserProgress(this.idUserL).subscribe(async data => {
      this.finS = this.dataModService.getMaxSubthemes()
      this.finT = this.dataModService.getMaxThemes()
      this.arrayProgressSTotal = this.dataModService.getMaxSubTotal()
      this.userProgressT = data.progressThemes
      this.userProgressS = data.progressSubthemes

      this.modList = this.dataModService.getMods()
      //this.modList2=this.modList
      this.modList2 = Object.assign([], this.modList)


      for (let i = 0; i < this.userProgressS.length; i++) {

        this.modList2[i].perc = 0

        for (let x = 0; x < this.userProgressS[i].length; x++) {


          if (this.userProgressS[i][x] > 0) {

            this.subtemas += this.userProgressS[i][x]
            this.arrayProgressS[i] += this.userProgressS[i][x]
          }
          else {
            break
          }
        }
        this.numb[i] = parseInt(((this.arrayProgressS[i] / this.arrayProgressSTotal[i]) * 100).toFixed(0))
        this.modList2[i].perc += this.numb[i]
      }

      for (var i = 0; i < this.modList2.length; i++) {
        if (this.modList2[i].perc == 100) {
          this.modList3.push(this.modList2[i])
          this.modList2.splice(i, 1)
          i--
        }
      }
      this.modList2.sort(function (a: any, b: any) { return b.perc - a.perc });
      this.modList3.map((data: any) => {
        this.modList2.push(data)

      })


      this.modLS = this.modList2.slice(0, 3)


    }, error => {
    });



    //colores modulos
    this.imagenArray = this.imagenArray.sort(() => Math.random() - 0.5)
  }
  btnNextCar() {
    this.modLS = this.modList2.slice(3, 6)
  }
  btnPrevCar() {
    this.modLS = this.modList2.slice(0, 3)
  }
  onOrientation() {
    this.router.navigate(["/platform/home/orientation"])
  }
  onProfile() {
    this.router.navigate(["/platform/home/profile"])
  }
  onProgress() {
    this.router.navigate(["/platform/home/progress"])
  }
  onTeachers() {
    this.router.navigate(["/platform/teachers"])
  }
  generateFontSizeGraphs() {
    if (this.dougOptions.legend && this.radarChartOptions.scale) {
      if (this.dougOptions.legend.labels && this.radarChartOptions.scale.pointLabels && this.dougOptions.legend.position) {
        if (window.innerWidth >= 1110) {
          this.dougOptions.legend.labels.fontSize = 12
          this.radarChartOptions.scale.pointLabels.fontSize = 14
        } else if (window.innerWidth < 1110 && window.innerWidth >= 925) {
          this.dougOptions.legend.labels.fontSize = 10
          this.radarChartOptions.scale.pointLabels.fontSize = 12
        } else if (window.innerWidth < 925 && window.innerWidth >= 830) {
          this.dougOptions.legend.labels.fontSize = 9
          this.radarChartOptions.scale.pointLabels.fontSize = 11
        } else if (window.innerWidth < 830 && window.innerWidth >= 645) {
          this.dougOptions.legend.labels.fontSize = 8
          this.radarChartOptions.scale.pointLabels.fontSize = 11
        } else if (window.innerWidth < 645 && window.innerWidth >= 426) {
          this.dougOptions.legend.labels.fontSize = 7
          this.radarChartOptions.scale.pointLabels.fontSize = 10
        } else if (window.innerWidth < 426 && window.innerWidth >= 301) {
          this.dougOptions.legend.labels.fontSize = 11
          this.radarChartOptions.scale.pointLabels.fontSize = 13
          this.dougOptions.legend.position = "bottom"
        } else if (window.innerWidth < 301 && window.innerWidth >= 0) {
          this.dougOptions.legend.labels.fontSize = 9
          this.radarChartOptions.scale.pointLabels.fontSize = 12
          this.dougOptions.legend.position = "bottom"
        }
      }
    }
  }
}
