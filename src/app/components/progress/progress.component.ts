import { UserparametersService } from './../../services/userparameters/userparameters.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { ChartDataSets, ChartType, RadialChartOptions, ChartOptions } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { UseranswerService } from 'src/app/services/useranswer/useranswer.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './../../services/user/user.service';
import { DataModService } from 'src/app/services/mod/data-mod.service';
import { UserProgressService } from 'src/app/services/userprogress/userprogress.service';



@Component({
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  prog = 0
  mod1 = 0
  vocT = 0

  idUserL: any
  user: any
  name = ""
  roleTeacher = false

  totSubthemes = 12
  vocational = 0
  profesional = 0
  experiencies = 0

  modList: any
  arraybar = []
  finT: any;
  finS: any;
  userProgressS: any;
  userProgressT: any;
  capitulos = 0;
  temas = 0;
  subtemas = 0;
  actividades = 0;

  arrayInfo = ["aptitudes profesionales", "Personalidad", "intereses vocacionales", "inteligencias multiples", "inteligencia emocional", "estilos de aprendizaje"]


  constructor(private dataModService: DataModService, private respondService: UseranswerService, private cookieService: CookieService, public jwthelper: JwtHelperService, private userService: UserService, private userProgressService: UserProgressService, private userParameterService: UserparametersService) {
    // dougOptionsAp
    // dougOptionsiM
    // radarChartOptionsPe
    // radarChartOptionsIv
    // polarChartOptionsIe
    // barChartOptionsEa
    if (this.barChartOptionsEa.scales &&  this.polarChartOptionsIe.legend && this.dougOptionsAp.legend && this.dougOptionsiM.legend && this.radarChartOptionsPe.scale && this.radarChartOptionsIv.scale) {
      if (this.barChartOptionsEa.scales.yAxes && this.barChartOptionsEa.scales.xAxes && this.barChartOptionsEa.scales.yAxes[0].ticks && this.barChartOptionsEa.scales.xAxes[0].ticks && this.polarChartOptionsIe.legend.labels && this.dougOptionsAp.legend.labels && this.dougOptionsiM.legend.labels && this.radarChartOptionsPe.scale.pointLabels && this.radarChartOptionsIv.scale.pointLabels) {
        if (window.innerWidth >= 1292) {
          this.dougOptionsAp.legend.labels.fontSize = 10
          this.dougOptionsiM.legend.labels.fontSize = 10
          this.radarChartOptionsPe.scale.pointLabels.fontSize = 10
          this.radarChartOptionsIv.scale.pointLabels.fontSize = 10
          this.polarChartOptionsIe.legend.labels.fontSize = 10
          this.barChartOptionsEa.scales.xAxes[0].ticks.fontSize = 12
          this.barChartOptionsEa.scales.yAxes[0].ticks.fontSize = 12
        } else if (window.innerWidth < 1292 && window.innerWidth >= 640) {
          this.dougOptionsAp.legend.labels.fontSize = 9
          this.dougOptionsiM.legend.labels.fontSize = 9
          this.radarChartOptionsPe.scale.pointLabels.fontSize = 9.8
          this.radarChartOptionsIv.scale.pointLabels.fontSize = 9.8
          this.polarChartOptionsIe.legend.labels.fontSize = 8
          this.barChartOptionsEa.scales.xAxes[0].ticks.fontSize = 9
          this.barChartOptionsEa.scales.yAxes[0].ticks.fontSize = 9

        } else if (window.innerWidth < 640 && window.innerWidth >= 560) {
          this.dougOptionsAp.legend.labels.fontSize = 9
          this.dougOptionsiM.legend.labels.fontSize = 9
          this.radarChartOptionsPe.scale.pointLabels.fontSize = 10.5
          this.radarChartOptionsIv.scale.pointLabels.fontSize = 9.8
          this.polarChartOptionsIe.legend.labels.fontSize = 8
          this.barChartOptionsEa.scales.xAxes[0].ticks.fontSize = 9
          this.barChartOptionsEa.scales.yAxes[0].ticks.fontSize = 9

        } else if (window.innerWidth < 560 && window.innerWidth >= 421) {
          this.dougOptionsAp.legend.labels.fontSize = 11
          this.dougOptionsiM.legend.labels.fontSize = 11
          this.radarChartOptionsPe.scale.pointLabels.fontSize = 12
          this.radarChartOptionsIv.scale.pointLabels.fontSize = 12
          this.polarChartOptionsIe.legend.labels.fontSize = 10
          this.barChartOptionsEa.scales.xAxes[0].ticks.fontSize = 10
          this.barChartOptionsEa.scales.yAxes[0].ticks.fontSize = 10

        } else if (window.innerWidth < 421 && window.innerWidth >= 340) {
          this.dougOptionsAp.legend.position = "bottom"
          this.dougOptionsiM.legend.position = "bottom"
          this.dougOptionsAp.legend.labels.fontSize = 11
          this.dougOptionsiM.legend.labels.fontSize = 11
          this.radarChartOptionsPe.scale.pointLabels.fontSize = 12
          this.radarChartOptionsIv.scale.pointLabels.fontSize = 12
          this.polarChartOptionsIe.legend.labels.fontSize = 10
          this.polarChartOptionsIe.legend.position = "bottom"
          this.barChartOptionsEa.scales.xAxes[0].ticks.fontSize = 10
          this.barChartOptionsEa.scales.yAxes[0].ticks.fontSize = 10

        } else if (window.innerWidth < 340 && window.innerWidth >= 0) {
          this.dougOptionsAp.legend.position = "bottom"
          this.dougOptionsiM.legend.position = "bottom"
          this.dougOptionsAp.legend.labels.fontSize = 11
          this.dougOptionsiM.legend.labels.fontSize = 11
          this.radarChartOptionsPe.scale.pointLabels.fontSize = 12
          this.radarChartOptionsIv.scale.pointLabels.fontSize = 12
          this.polarChartOptionsIe.legend.labels.fontSize = 7
          this.polarChartOptionsIe.legend.position = "bottom"
          this.barChartOptionsEa.scales.xAxes[0].ticks.fontSize = 10
          this.barChartOptionsEa.scales.yAxes[0].ticks.fontSize = 10

        }
      }
    }
  }
  //Aptitudes profesionales UL
  public doughnutChartLabelsAp: Label[] = [];
  public doughnutChartDataAp: ChartDataSets[] = [
    { data: [3, 3, 3, 3, 3] }
  ];
  public doughnutChartTypeAp: ChartType = 'doughnut';
  public dougOptionsAp: ChartOptions = {
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
  colorsAp: Color[] = [
    {
      backgroundColor: [
        'rgb(183, 103, 253)',
        'rgb(0, 202, 168)',
        'rgb(33, 148, 255)',
        'rgb(255, 149, 84)',
        'rgb(255, 201, 80)',
        'rgb(250, 77, 77)',
        'rgb(192, 41, 192)',
      ],

    }
  ];

  //Inteligencias multiples DL
  public doughnutChartLabelsiM: Label[] = [];
  public doughnutChartDataiM: ChartDataSets[] = [
    { data: [] }
  ];
  public doughnutChartTypeiM: ChartType = 'doughnut';
  public dougOptionsiM: ChartOptions = {
    cutoutPercentage: 80,
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
  colorsiM: Color[] = [
    {
      backgroundColor: [
        'rgb(251,0,30)',
        'rgb(205, 241, 120)',
        'rgb(215, 109, 84)',
        'rgb(103, 43, 203)',
        'rgb(3, 248, 205)',
        'rgb(100, 102, 68)',
        'rgb(92, 241, 92)',
        'rgb(25, 177, 254)',
      ],

    }
  ];

  //Personalidad UM
  radarChartColorsPe = [
    { // grey
      backgroundColor: 'rgba(230, 169, 230, 0.7)',
      borderColor: 'rgba(203,80,203)', //este para cambiar por un morado
      pointBackgroundColor: 'rgba(203,80,203)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public radarChartOptionsPe: RadialChartOptions = {
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
        borderWidth: 1
      }
    },

  };
  public radarChartLabelsPe: Label[] = [];
  public radarChartDataPe: ChartDataSets[] = [
    { data: [] },
  ];
  public radarChartTypePe: ChartType = 'radar';

  //Intereses vocacionales UR
  radarChartColorsIv = [
    { // grey
      backgroundColor: 'rgba(242, 137, 0, 0.415)',
      borderColor: 'rgba(242, 137, 0, 0.815)', //este para cambiar por un morado
      pointBackgroundColor: 'rgba(242, 137, 0, 0.815)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public radarChartOptionsIv: RadialChartOptions = {
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
  public radarChartLabelsIv: Label[] = [];
  public radarChartDataIv: ChartDataSets[] = [
    { data: [] },
  ];
  public radarChartTypeIv: ChartType = 'radar';
  //Inteligencia emocional DM
  public polarAreaChartLabelsIe: Label[] = ['ASD', 'Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartDataIe: SingleDataSet = [];
  public polarAreaLegendIe = true;
  public polarChartOptionsIe: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
      labels: {
        fontSize: 0,
      }
    },
    scale: {
      ticks: {
        min: 0,
        max: 9,
        display: false,
      },


    },
  };
  colorsIe: Color[] = [
    {
      backgroundColor: [
        'rgb(98, 0, 195, 0.8)',
        'rgb(0, 255, 0, 0.8)',
        'rgb(0, 0, 255, 0.8)',
        'rgb(215, 107, 80, 0.8)',
        'rgb(245, 255, 7, 0.8)',
        'rgb(255, 0, 0, 0.8)',
      ],

    }
  ];
  public polarAreaChartTypeIe: ChartType = 'polarArea';
  //Estilos de aprendizaje DR
  colorsEa: Color[] = [
    {
      backgroundColor: [
        'rgb(192,41,192)',
        'rgb(255,158,104)',
        'rgb(0, 202, 168)',
        'rgb(0, 88, 255)',
      ],

    }
  ];
  public barChartOptionsEa: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          fontSize: 0
      },
        gridLines: {
          display: false
        },
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 10,
          stepSize: 5,
          fontSize: 0
        },
        gridLines: {
          display: false
        },
      }]
    },
    legend: {
      display: false,

    },
    plugins: {
      datalabels: {
        display: false,
        anchor: 'end',
        align: 'end',
      }
    },

  };

  public barChartLabelsEa: Label[] = ['2006', '2007', '2008', '2009'];
  public barChartTypeEa: ChartType = 'bar';
  public barChartLegendEa = true;

  public barChartDataEa: ChartDataSets[] = [
    { data: [] },
  ];

  ngOnInit() {
    const token = this.cookieService.get('token');
    const decoded = this.jwthelper.decodeToken(token);
    this.idUserL = decoded.sub;
    console.log(this.idUserL)
    this.userService.getUser(decoded.sub).subscribe(data => {
      this.user = data
      this.name = this.user.name
      if (this.user.role == "school-admin" || this.user.role == "teacher") {
        this.roleTeacher = true
      }
    })

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
    //Control progreso
    this.modList = this.dataModService.getMods()
    this.finS = this.dataModService.getMaxSubthemes()
    this.finT = this.dataModService.getMaxThemes()
    this.userProgressService.getUserProgress(this.idUserL).subscribe(data => {
      this.userProgressT = data.progressThemes
      this.userProgressS = data.progressSubthemes

      this.arraybar = this.userProgressT
      console.log(this.userProgressS)
      for (let i = 0; i < this.userProgressS.length; i++) {
        if (this.userProgressT[i] == this.finT[i]) {
          this.capitulos++
        }
        console.log(this.userProgressS[i].length)
        for (let x = 0; x < this.userProgressS[i].length; x++) {
          if (this.userProgressS[i][x] > 0) {
            this.temas++
            this.subtemas += this.userProgressS[i][x]
          }
          else {
            break;
          }
        }
      }
    }, error => {
    })
    this.doughnutChartLabelsAp = this.dataModService.getParamProf()
    this.radarChartLabelsPe = this.dataModService.getParamsPer()
    this.radarChartLabelsIv = this.dataModService.getParamVoc()
    this.doughnutChartLabelsiM = this.dataModService.getParamIntem()
    this.polarAreaChartLabelsIe = this.dataModService.getParamsInteE()
    this.barChartLabelsEa = this.dataModService.getParamsEstApr()
    this.userParameterService.getUserParameters(this.idUserL).subscribe(result => {
      console.log(result.values)
      this.polarAreaChartDataIe = result.values.slice(47, 53)
      this.barChartDataEa[0].data = result.values.slice(43, 47)
      this.radarChartDataIv[0].data = result.values.slice(0, 5)
      this.radarChartDataPe[0].data = result.values.slice(12, 21)
      this.doughnutChartDataiM[0].data = result.values.slice(32, 40)
      this.doughnutChartDataAp[0].data = result.values.slice(5, 12)


    })
  }



}
