import { MediaService } from './../../services/media/media.service';
import { Interaction } from './../../models/interaction.model';
import { InteractionService } from './../../services/interactions/interaction.service';
import { environment } from './../../../environments/environment';
import { CryptoService } from './../../services/crypto/crypto.service';
import { UserService } from 'src/app/services/user/user.service';
import { Script } from './../../models/script.model';
import { ScriptsService } from '../../services/scripts/scripts.service';
import { UserAnswer } from './../../models/useranswer.model';
import { UseranswerService } from './../../services/useranswer/useranswer.service';
import { SubthemeService } from './../../services/subtheme/subtheme.service';
import { DataModService } from './../../services/mod/data-mod.service';
import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ClipboardService } from 'ngx-clipboard';
import { UserparametersService } from 'src/app/services/userparameters/userparameters.service';
import { UserProgressService } from 'src/app/services/userprogress/userprogress.service';
import videojs from 'video.js';
@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.scss']
})
export class ModComponent implements OnInit, OnDestroy {
  //Cosas traidas de back
  idUserL: any
  //idUserL = "60c5e00a57c18d4c986e51df"
  licenciaid = ""
  //Numero del modulo
  numMod: any
  //Nombre del modulo
  modName: any
  //Lista de modulos
  modList: any
  //Numero del tema activo
  numThemeActive = 1
  //Lista de todos los temas
  allThemeList: any
  //Lista de los temas activos
  themeList: any
  //Lista de subtemas del tema activo
  subthemesList: any
  //Num del subtema activo
  numSubthemeActive = 1
  //Bloqueo con los texto
  activitiesList: any
  //Actividad actual
  activity: any
  //Numero de actividad activo
  numActivity = 0
  finT: any;
  finS: any;
  //Actividad lista
  itemList = ""
  listItemsLista: Array<string> = [];
  //True bloqueamos tema false dejamos libre
  blockTheme: any
  //True bloqueamos subtema false dejamos libre
  blockSubtheme: any
  //Si el subtema yua esta hecho ponemos una pantallita para dar mas exp de usuario
  blockCompleted: any
  answersList: Array<any> = []
  answer: Array<string> = []
  texto = ""
  videoSeen = false
  fbTexto = ""
  cardError: string = ""
  last = false
  response: any
  comodin: any = []
  userResponse: UserAnswer = new UserAnswer
  completed: Array<any> = []
  videoUrl = ""
  user: any
  userParametersPdf: Array<any> = []
  userName = ""
  onLoadingReport = false
  saving = false
  johariQuery = ""
  uriInteraction = "https://app.growthroad.es/#/interaction?tok="
  //uriInteraction = "localhost:4200/#/interaction?token="
  linkJohariShow = false
  copiedLink = false
  generatedLink = true
  interaction: Interaction = new Interaction()
  userAnswers: Array<any> = []
  interactionResult: Array<any> = []
  interactionShow = false
  refShow = false
  answerRef: any
  parametersShow = false
  parametersList: Array<any> = []
  nameParametersList: Array<any> = []
  //Toggle tema
  themeToggled = false
  player: any
  playerv: any
  playervrate: any
  savingAct = false
  constructor(
    public mediaService: MediaService,
    private cryptoService: CryptoService,
    private clipboardApi: ClipboardService,
    private parametersService: UserparametersService,
    private scriptService: ScriptsService,
    public jwthelper: JwtHelperService,
    private cookieService: CookieService,
    private userAnswerService: UseranswerService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datModService: DataModService,
    private subthemeService: SubthemeService,
    private interactionService: InteractionService,
    private userProgressService: UserProgressService,
    public ngzone: NgZone,
  ) {

  }

  ngOnDestroy(): void {
    this.player.dispose()
    if (this.playerv) {
      this.playerv.dispose()
    }
    if (this.playervrate) {
      this.playervrate.dispose()
    }
  }

  //Metodos para toggle temas
  toggleThemes() {
    this.themeToggled = !this.themeToggled
  }

  ngOnInit(): void {
    this.finS = this.datModService.getMaxSubthemes()
    this.finT = this.datModService.getMaxThemes()
    this.numMod = this.activatedRoute.snapshot.paramMap.get("id")
    const token = this.cookieService.get('token');
    const decoded = this.jwthelper.decodeToken(token);
    this.idUserL = decoded.sub
    this.userService.getUser(this.idUserL).subscribe(data => {
      this.user = data
      this.userName = data.name + " " + data.surname
      this.licenciaid = data.license
      this.modData()
    })

  }

  //PDF
  generateReport() {
    this.onLoadingReport = true
    window.scroll(0, 0)
    this.scriptService.exeScriptReport(this.idUserL, this.userName).subscribe((data: any) => {
      console.debug('GENERATEREPORT', data)
      let file = new Blob([data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      this.onLoadingReport = false
    })
  }

  modData() {
    const num = parseInt(this.numMod)
    if (num > 1 && this.licenciaid == "B") {
      this.router.navigate(["/platform/home/orientation/vocation"])
    }
    this.modList = this.datModService.getMods()
    this.modName = this.modList[num - 1].name
    this.themeData()
  }

  themeData() {
    this.allThemeList = this.datModService.getThemes()
    this.themeList = this.allThemeList[parseInt(this.numMod) - 1]
    this.onChangeTheme(this.numThemeActive)
  }

  onChangeTheme(nT: any) {
    this.generatedLink = true
    this.completed = []
    this.numThemeActive = nT
    this.cardError = ""
    this.answer = []
    this.answersList = []
    this.activity = []
    this.texto = ""
    this.fbTexto = ""
    this.itemList = ""
    this.listItemsLista = []
    this.linkJohariShow = false
    this.numSubthemeActive = 1
    this.subthemeData(this.numThemeActive)
  }

  async takeRespondMT(m: any, t: any) {
    if (t == 1) {
      this.blockTheme = false
    } else {

      const z = this.finS[this.numMod - 1][this.numThemeActive - 2]
      this.userAnswerService.getUserAnswerByUserMt(this.idUserL, m, t - 1).subscribe((data: any) => {
        if (data.length !== z) {
          this.blockTheme = true
        }
      })

    }
    if (!this.blockTheme) {
      await this.userAnswerService.getUserAnswerByUserMt(this.idUserL, m, t).subscribe((data: any) => {
        const x = data.length
        for (let index = 0; index < x; index++) {
          this.completed[index] = true
        }

      })
    }
  }

  subthemeData(nT: any) {
    this.subthemeService.getSubthemes(this.numMod, nT).subscribe(async (data: any) => {
      this.subthemesList = data
      this.videoUrl = this.subthemesList[this.numSubthemeActive - 1].video
      this.onChangeSubtheme(1)
    },
      error => {
        console.log(error)
        //CONTROLAR ERROR
      })
  }

  async onChangeSubtheme(nS: any) {
    this.generatedLink = true
    await this.takeRespondMT(parseInt(this.numMod), this.numThemeActive)
    this.numSubthemeActive = nS
    this.videoUrl = this.subthemesList[this.numSubthemeActive - 1].video
    if (nS == 1) {
      this.blockTheme = false
    } else {
      if (this.completed[nS - 2]) {
        this.blockTheme = false
      } else {
        this.blockTheme = true
      }
    }

    if (!this.blockTheme) {

      if (this.completed[nS - 1]) {
        //Si el subtema esta hecho
        this.blockCompleted = true
      } else {
        this.blockCompleted = false
      }
    }
    this.cardError = ""
    this.answersList = []
    this.answer = []
    this.activity = []
    this.texto = ""
    this.fbTexto = ""
    this.videoSeen = false
    this.itemList = ""
    this.listItemsLista = []
    this.linkJohariShow = false
    this.interactionShow = false
    this.parametersShow = false
    this.last = false
    this.refShow = false
    this.player = videojs('videosb')
    this.player.src({
      src: `https://hls.growthroad.es/${this.videoUrl}_360p.mp4/index.m3u8`,
      type: 'application/x-mpegURL'
    });
    this.player.load()
    this.activityData(this.numSubthemeActive)
  }

  async activityData(nS: any) {
    this.numActivity = 0
    this.activitiesList = this.subthemesList[nS - 1].activities
    let z = 0
    this.comodin = []
    this.activitiesList.map((data: any) => {
      this.comodin[z] = data.activityType
      z += 1
    })
    this.activity = this.activitiesList[this.numActivity]
    this.takeRespondsMTS(this.numMod, this.numThemeActive, this.numSubthemeActive)
    if (!this.activitiesList[this.numActivity]) {
      this.activity = false
      this.last = false
      this.numActivity = -1
    }
  }

  revise() {
    let showvideo = false
    let showvideorate = false
    this.numActivity = 0
    this.activity = this.activitiesList[this.numActivity]
    switch (this.activity.activityType) {
      case "Seleccionador":
        this.answer = this.answersList[this.numActivity]
        break;
      case "Seleccionadorv2":
        this.answer = this.answersList[this.numActivity]
        break;
      case "Texto":
        this.texto = this.answersList[this.numActivity]
        break;
      case "Valoracion":
        this.answer = this.answersList[this.numActivity]
        break;
      case "Johari":
        this.answer = ["johari"]
        break;
      case "Lista":
        this.listItemsLista = this.answersList[this.numActivity]
        break;
      case "Feedback":
        this.fbTexto = this.answersList[this.numActivity]
        break;
      case "Video":
        showvideorate = false
        showvideo = true
        this.answer = ["video"]
        break;
      case "Parameters":
        this.answer = ["parameters"]
        break;
      case "Enunciado":
        this.answer = ["enun"]
        break;
      case "VideoRate":
        showvideorate = false
        showvideorate = true
        this.answer = this.answersList[this.numActivity]
        break;
      case "VideoCheck":
        this.videoSeen = this.answersList[this.numActivity]
        break;
      case "Interaction":
        this.answer = ["inter"]
        break;
    }
    if (showvideo) {
      setTimeout(() => {
        this.playerv = videojs('videonormal')
        this.playerv.src({
          src: `https://hls.growthroad.es/${this.activity.media}_360p.mp4/index.m3u8`,
          type: 'application/x-mpegURL'
        });
        this.playerv.load()
      }, 2500);
    }
    if (showvideorate) {
      setTimeout(() => {
        this.playervrate = videojs('videorate')
        this.playervrate.src({
          src: `https://hls.growthroad.es/${this.activity.media}_360p.mp4/index.m3u8`,
          type: 'application/x-mpegURL'
        });
        this.playervrate.load()
      }, 2500);
    }
    this.blockCompleted = false
    this.last = false
  }

  continueAct() {
    this.generatedLink = true
    window.scroll(0, 0)
    const z = this.finS[this.numMod - 1][this.numThemeActive - 1];
    if (this.numThemeActive == this.finT[this.numMod - 1] && this.numSubthemeActive == this.finS[this.numMod - 1][this.numThemeActive - 1]) {

      return;
    }
    if (z == this.numSubthemeActive) {
      //this.router.navigateByUrl("/home/orientation/vocation"+this.numMod+1)
      const x = Number(this.numThemeActive) + Number(1);
      this.onChangeTheme(x);
    } else {
      this.onChangeSubtheme(this.numSubthemeActive + 1);
    }

    this.blockTheme = false
    //True bloqueamos subtema false dejamos libre
    //Si el subtema yua esta hecho ponemos una pantallita para dar mas exp de usuario
    this.blockCompleted = false
    this.answer = []
    this.texto = ""
    this.videoSeen = false
    this.fbTexto = ""
    this.itemList = ""
    this.listItemsLista = []
  }

  takeRespondsMTS(m: any, t: any, s: any) {
    let showvideo = false
    let showvideorate = false
    this.userAnswerService.getUserAnswerByUserMts(this.idUserL, m, t, s).subscribe((data: any) => {
      if (data) {
        this.blockCompleted = true
        this.response = data
        let i = 0
        const userAns = data.respond
        userAns.map((data: any) => {
          this.answersList[i] = data.ans
          i += 1
        })
        switch (this.comodin[this.numActivity]) {
          case "Seleccionador":
            this.answer = this.answersList[this.numActivity]
            break;
          case "Seleccionadorv2":
            this.answer = this.answersList[this.numActivity]
            break;
          case "Texto":
            this.texto = this.answersList[this.numActivity]
            break;
          case "Valoracion":
            this.answer = this.answersList[this.numActivity]
            break;
          case "Johari":
            this.answer = ["johari"]
            break;
          case "Lista":
            this.listItemsLista = this.answersList[this.numActivity]
            break;
          case "Feedback":
            this.fbTexto = this.answersList[this.numActivity]
            break;
          case "Video":
            this.answer = ["video"]
            showvideo = true
            //   <source [src]="'https://hls.growthroad.es/'+activity.media+'_360p.mp4/index.m3u8'" type="application/x-mpegURL">
            break;
          case "Parameters":
            this.answer = ["parameters"]
            break;
          case "Enunciado":
            this.answer = ["enun"]
            break;
          case "VideoRate":
            this.answer = this.answersList[this.numActivity]
            showvideorate = true
            // <source [sizes]="" [src]="'https://hls.growthroad.es/'+activity.media+'_360p.mp4/index.m3u8'" type="application/x-mpegURL">
            break;
          case "VideoCheck":
            this.videoSeen = this.answersList[this.numActivity]
            break;
          case "Interaction":
            this.answer = ["inter"]
            break;
        }

      } else {
        this.answer = []
      }

    }, error => {
      console.log(error)

    })
    if (showvideo) {
      setTimeout(() => {
        this.playerv = videojs('videonormal')
        this.playerv.src({
          src: `https://hls.growthroad.es/${this.activity.media}_360p.mp4/index.m3u8`,
          type: 'application/x-mpegURL'
        });
        this.playerv.load()
      }, 2500);
    }
    if (showvideorate) {
      setTimeout(() => {
        this.playervrate = videojs('videorate')
        this.playervrate.src({
          src: `https://hls.growthroad.es/${this.activity.media}_360p.mp4/index.m3u8`,
          type: 'application/x-mpegURL'
        });
        this.playervrate.load()
      }, 2500);
    }
  }

  onBack() {
    this.router.navigateByUrl("/platform/home/orientation/vocation")
    if (this.player) {
      this.player.dispose()
    }
    if (this.playerv) {
      this.playerv.dispose()
    }
    if (this.playervrate) {
      this.playervrate.dispose()
    }
  }

  //Métodos para referencias
  generateRefAns() {
    this.generatedLink = false
    const r = this.activity.ref
    let choosen: any
    this.userAnswerService.getUserAnswerByUserMts(this.idUserL, r[0], r[1], r[2]).subscribe(data => {
      const x = data
      choosen = x.respond[r[3] - 1].ans
      switch (x.respond[r[3] - 1].activityType) {
        //Mas tipos en un futuro
        case "Lista":
          this.answerRef = choosen
          break;
        case "Texto":
          this.answerRef = choosen
          break;
        case "Seleccionador":
          this.subthemeService.getSubtheme(r[0], r[1], r[2]).subscribe(result => {
            const z = result.activities[r[3] - 1]
            const options = z.answers
            let answerArray: Array<any> = []
            choosen.map((a: any) => {
              answerArray.push(options[a - 1])
            })
            this.answerRef = answerArray
          })
          break;
        case "Seleccionadorv2":
          this.subthemeService.getSubtheme(r[0], r[1], r[2]).subscribe(result => {
            const z = result.activities[r[3] - 1]
            const options = z.answers
            let answerArray: Array<any> = []
            choosen.map((a: any) => {
              answerArray.push(options[a - 1])
            })
            this.answerRef = answerArray
          })
          break;
      }

    })
    this.refShow = true
  }

  //Métodos para johari
  copyLink() {
    this.clipboardApi.copyFromContent(this.uriInteraction)
    this.copiedLink = true
    setTimeout(() => {
      this.copiedLink = false
    }, 1000);
  }

  generateLinkJohari() {
    //aplicar el tema y subtema que toque
    this.interactionService.checkInteraction(this.idUserL).subscribe(d => {
      if (d.result == false) {
        const answersOptions = ["abierta", "activa", "ágil de mente", "agresiva", "amable", "ambiciosa", "analítica",
          "asertiva", "atenta", "auténtica", "capaz", "con carácter", "cauta", "clara", "coherente", "colaboradora",
          "comunicadora", "conciliadora", "consciente", "constante", "constructiva", "con control", "emocional",
          "convincente", "cooperativa", "cordial", "creativa", "coherente",
          "con criterio", "critica", "cuidadosa", "culta", "cumplidora", "decidida", "desenvuelta", "dialogante", "discreta", "educada", "eficaz", "eficiente", "emprendedora", "enérgica", "entusiasta", "etica", "exigente", "extrovertida", "flexible",
          "formal", "hábil", "honesta", "imaginativa", "independiente", "justa", "leal", "capacidad de líder", "lógica", "madura", "matemática", "mecánica", "con memoria", "metódica", "minuciosa",
          "motivadora", "negociadora", "objetiva", "organizada", "ordenada", "paciente", "persistente", "persuasiva", "polivalente", "positiva", "práctica", "precavida", "puntual",
          "rápida", "razonable", "con recursos", "reflexiva", "respetuosa", "responsable", "resolutiva", "segura", "sensata", "sensible", "serena", "sincera", "prudente", "no problemática", "tenaz", "tolerante", "voluntariosa",]
        //7 primeras posiciones para los que si, 3 siguientes para los que no y 5 siguientes para la lista del primer subtema
        //primeras posiciones para los 5 de la lista, luego los 7 que si y luego los 3 que no
        // 0-4,4-11,11-14
        //Cambiar a 341 y342
        this.userAnswerService.getUserAnswerByUserMts(this.idUserL, 3, 4, 1).subscribe(data => {

          if (data) {
            data.respond[0].ans.map((x: any) => {
              this.userAnswers.push(x)
            })
            //Cambiar a 341 y342
            this.userAnswerService.getUserAnswerByUserMts(this.idUserL, 3, 4, 2).subscribe(result => {
              if (result) {
                //Good
                result.respond[0].ans.map((t: any) => {
                  this.userAnswers.push(answersOptions[t - 1])

                })

                //Bad
                result.respond[1].ans.map((t: any) => {
                  this.userAnswers.push(answersOptions[t - 1])

                })
                this.interaction.idUser = this.idUserL
                this.interaction.optionsName = this.userAnswers
                this.interactionService.createInteraction(this.interaction).subscribe(t => {
                }, error => {
                  console.log(error)
                })
              }
            })
          } else {
            //Error
          }
        }, error => {
          //Error
        })


      }
      this.userService.addCodeKey(this.idUserL).subscribe(r => {
        this.generatedLink = false
        const z = { idUser: this.idUserL, codekey: r.token }
        this.johariQuery = this.cryptoService.set(environment.secretKey, JSON.stringify(z))
        this.johariQuery = this.johariQuery.replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l');
        this.uriInteraction += this.johariQuery
        this.linkJohariShow = true
      }, error => {
        this.cardError = error
      })
    })
  }

  //Métodos para parameters
  generateParameters(tipe: String) {
    this.parametersService.getUserParameters(this.idUserL).subscribe(data => {
      switch (tipe) {
        case "avk":
          this.nameParametersList = this.datModService.getParamAVK()
          this.parametersList = data.values.slice(40, 43)
          break;
        case "intem":
          this.nameParametersList = this.datModService.getParamIntem()
          this.parametersList = data.values.slice(32, 40)
          break;
      }
      this.parametersShow = true
    })
  }
  //Métodos para interactions
  async generateInteraction(opt: any) {
    // 0-4,4-11,11-14
    this.interactionShow = true
    this.interactionResult = []
    let ineraction: any
    let arrCom: Array<any> = []
    let optionsName: any
    this.generatedLink = false
    await this.interactionService.getInteraction(this.idUserL).subscribe(data => {
      ineraction = data
      if (opt == "1") {
        optionsName = ineraction.optionsName.slice(5, 12)
        ineraction.respond.map((f: any) => {
          arrCom.push(f.slice(5, 12))
        })
        for (let i = 0; i < 7; i++) {
          let joins = 0
          let cont = 0
          arrCom.map((x: any) => {
            joins += Number(x[i])
            cont++
          })
          if (joins / cont >= 2.5) {
            this.interactionResult.push(optionsName[i])

          }
        }
      } else {
        //2i
        // 0-4,4-11,11-14
        //Los 5
        optionsName = ineraction.optionsName.slice(0, 5)
        ineraction.respond.map((f: any) => {
          arrCom.push(f.slice(0, 5))
        })
        for (let i = 0; i < 5; i++) {
          let joins = 0
          let cont = 0
          arrCom.map((x: any) => {
            joins += Number(x[i])
            cont++
          })
          if (joins / cont >= 2.5) {
            this.interactionResult.push(optionsName[i])

          }
        }
        //Los 3
        optionsName = []
        arrCom = []
        optionsName = ineraction.optionsName.slice(12)
        ineraction.respond.map((f: any) => {
          arrCom.push(f.slice(12))
        })
        for (let i = 0; i < 3; i++) {
          let joinss = 0
          let contt = 0
          arrCom.map((x: any) => {
            joinss += Number(x[i])
            contt++
          })
          if (joinss / contt <= 2.5) {
            this.interactionResult.push(optionsName[i])

          }
        }
      }
    })

  }

  //Métodos para la lista
  addItemToList() {
    if (this.listItemsLista.length >= this.activity.limit) {
      this.cardError = "No puedes poner más"
      this.itemList = ""
      setTimeout(() => {
        this.cardError = ""
      }, 1000);
    } else {
      if (this.itemList !== "") {
        this.listItemsLista.push(this.itemList)
        this.itemList = ""
      } else {
        this.cardError = "Añade algo"
        setTimeout(() => {
          this.cardError = ""
        }, 2500);
      }
    }
  }

  deleteItemList(item: any) {
    this.listItemsLista = this.listItemsLista.filter(d => d !== item)
  }
  //Metodos para el validator
  onChangeVal(event: any, pos: any) {
    this.answer[pos - 1] = event.target.value
  }

  onCheckVal(num: any) {
    return this.answer[num]
  }
  //Metodos para el seleccionador
  onChange(event: any) {
    if (event.target.checked) {
      this.answer.push(event.target.value)
    } else {
      const numDelete = this.answer.indexOf(event.target.value)
      this.answer.splice(numDelete, 1)
    }
  }

  isChecked(num: any) {
    if (this.answer.find(data => data == num)) {
      return true
    } else {
      return false
    }
  }
  //controles actividades
  onActBack(activityType: any) {
    this.generatedLink = true
    //Check si la actividad es video
    let showvideo = false
    let showvideorate = false
    this.cardError = ""
    switch (activityType) {
      case "Seleccionador":
        this.answersList[this.numActivity] = this.answer
        break;
      case "Seleccionadorv2":
        this.answersList[this.numActivity] = this.answer
        break;
      case "Texto":
        this.answersList[this.numActivity] = this.texto
        break;
      case "Valoracion":
        this.answersList[this.numActivity] = this.answer
        break;
      case "Johari":
        this.answersList[this.numActivity] = ["johari"]
        break;
      case "Lista":
        this.answersList[this.numActivity] = this.listItemsLista
        break;
      case "Feedback":
        this.answersList[this.numActivity] = this.fbTexto
        break;
      case "Video":
        this.answersList[this.numActivity] = ["video"]
        if (this.playerv) {
          this.playerv.dispose()
        }
        break;
      case "Parameters":
        this.answersList[this.numActivity] = ["parameters"]
        break;
      case "Enunciado":
        this.answersList[this.numActivity] = ["enun"]
        break;
      case "VideoRate":
        this.answersList[this.numActivity] = this.answer
        if (this.playervrate) {
          this.playervrate.dispose()
        }
        break;
      case "VideoCheck":
        this.answersList[this.numActivity] = this.videoSeen
        break;
      case "Interaction":
        this.answersList[this.numActivity] = ["inter"]
    }
    this.answer = []
    this.texto = ""
    this.videoSeen = false
    this.numActivity -= 1
    this.interactionResult = []
    this.activity = this.activitiesList[this.numActivity]
    if (this.answersList[this.numActivity]) {
      switch (this.activity.activityType) {
        case "Seleccionador":
          this.answer = this.answersList[this.numActivity]
          break;
        case "Seleccionadorv2":
          this.answer = this.answersList[this.numActivity]
          break;
        case "Texto":
          this.texto = this.answersList[this.numActivity]
          break;
        case "Valoracion":
          this.answer = this.answersList[this.numActivity]
          break;
        case "Johari":
          this.answer = ["johari"]
          break;
        case "Lista":
          this.listItemsLista = this.answersList[this.numActivity]
          break;
        case "Feedback":
          this.fbTexto = this.answersList[this.numActivity]
          break;
        case "Video":
          this.answer = ["video"]
          showvideo = true
          break;
        case "Parameters":
          this.answer = ["parameters"]
          break;
        case "Enunciado":
          this.answer = ["enun"]
          break;
        case "VideoRate":
          this.answer = this.answersList[this.numActivity]
          showvideorate = true
          break;
        case "VideoCheck":
          this.videoSeen = this.answersList[this.numActivity]
          break;
        case "Interaction":
          this.answer = ["inter"]
          break;
      }
    }
    if (showvideo) {
      setTimeout(() => {
        this.playerv = videojs('videonormal')
        this.playerv.src({
          src: `https://hls.growthroad.es/${this.activity.media}_360p.mp4/index.m3u8`,
          type: 'application/x-mpegURL'
        });
        this.playerv.load()
      }, 2500);
    }
    if (showvideorate) {
      setTimeout(() => {
        this.playervrate = videojs('videorate')
        this.playervrate.src({
          src: `https://hls.growthroad.es/${this.activity.media}_360p.mp4/index.m3u8`,
          type: 'application/x-mpegURL'
        });
        this.playervrate.load()
      }, 2500);
    }
  }

  onActNext(activityType: any) {
    let showvideo = false
    let showvideorate = false
    this.generatedLink = true
    this.cardError = ""
    switch (activityType) {
      case "Seleccionador":
        if (this.answer.length <= this.activity.limit && this.answer.length >= this.activity.min) {
          this.answersList[this.numActivity] = this.answer
        } else {
          this.cardError = "Tienes que seleccionar mínimo " + this.activity.min + " campos"
        }
        break;
      case "Texto":
        if (this.texto == "") {
          this.cardError = "Tienes que rellenar el texto"
        } else {
          this.answersList[this.numActivity] = this.texto
        }
        break;
      case "Seleccionadorv2":
        if (this.answer.length <= this.activity.limit && this.answer.length >= this.activity.min) {
          this.answersList[this.numActivity] = this.answer
        } else {
          this.cardError = "Tienes que seleccionar mínimo " + this.activity.min + " campos"
        }
        break;

      case "Valoracion":
        let vacio = false
        for (let index = 0; index < this.answer.length; index++) {
          if (!this.answer[index]) {
            vacio = true
          }
        }
        if (this.answer.length !== this.activity.answers.length) {
          this.cardError = "Tienes que valorar todos los campos correctamente"
        } else {

          if (vacio) {
            this.cardError = "Tienes que rellenar todos los campos correctamente"
          } else {
            this.answersList[this.numActivity] = this.answer
          }
        }
        break;
      case "Johari":
        this.answersList[this.numActivity] = ["johari"]
        break;
      case "Lista":
        if (this.listItemsLista.length <= this.activity.limit && this.listItemsLista.length >= this.activity.min) {
          this.answersList[this.numActivity] = this.listItemsLista
        } else {
          this.cardError = "Tienes que seleccionar al menos " + this.activity.min + " respuestas y como mucho " + this.activity.limit
        }
        break;
      case "Feedback":
        this.answersList[this.numActivity] = this.fbTexto
        break;
      case "Video":
        this.answersList[this.numActivity] = ["video"]
        if (this.playerv) {
          this.playerv.dispose()
        }
        break;
      case "Parameters":
        this.answersList[this.numActivity] = ["parameters"]
        break;
      case "Enunciado":
        this.answersList[this.numActivity] = ["enun"]
        break;
      case "VideoRate":
        if (this.answer[0]) {
          this.answersList[this.numActivity] = this.answer
          if (this.playervrate) {
            this.playervrate.dispose()
          }
        } else {
          this.cardError = "Valora el vídeo antes de seguir."
        }
        break;
      case "VideoCheck":
        if (this.videoSeen) {
          this.answersList[this.numActivity] = this.videoSeen
        } else {
          this.cardError = "Checkea si has visto el video antes de seguir"
        }
        break;
      case "Interaction":
        this.answersList[this.numActivity] = ["inter"]
        break;
    }
    if (!this.cardError) {
      window.scroll(0, 180)
      this.answer = []
      this.interactionResult = []
      this.texto = ""
      this.videoSeen = false
      this.numActivity += 1
      this.activity = this.activitiesList[this.numActivity]
      if (this.answersList[this.numActivity]) {
        switch (this.activity.activityType) {
          case "Seleccionador":
            this.answer = this.answersList[this.numActivity]
            break;
          case "Seleccionadorv2":
            this.answer = this.answersList[this.numActivity]
            break;
          case "Texto":
            this.texto = this.answersList[this.numActivity]
            break;
          case "Valoracion":
            this.answer = this.answersList[this.numActivity]
            break;
          case "Johari":
            this.answer = ["johari"]
            break;
          case "Lista":
            this.listItemsLista = this.answersList[this.numActivity]
            break;
          case "Feedback":
            this.fbTexto = this.answersList[this.numActivity]
            break;
          case "Video":
            this.answer = ["video"]
            showvideo = true
            break;
          case "Parameters":
            this.answer = ["parameters"]
            break;
          case "Enunciado":
            this.answer = ["enun"]
            break;
          case "VideoRate":
            this.answer = this.answersList[this.numActivity]
            showvideorate = true
            break;
          case "VideoCheck":
            this.videoSeen = this.answersList[this.numActivity]
            break;
          case "Interaction":
            this.answer = ["inter"]
            break;
        }

      } else {
        this.answer = []
        this.texto = ""
        this.videoSeen
        this.itemList = ""
        this.listItemsLista = []
        this.fbTexto = ""

      }
    }
    if (showvideo) {
      setTimeout(() => {
        this.playerv = videojs('videonormal')
        this.playerv.load()
        this.playerv.src({
          src: `https://hls.growthroad.es/${this.activity.media}_360p.mp4/index.m3u8`,
          type: 'application/x-mpegURL'
        });
        this.playerv.load()
      }, 2500);
    }
    if (showvideorate) {
      setTimeout(() => {
        this.playervrate = videojs('videorate')
        this.playervrate.src({
          src: `https://hls.growthroad.es/${this.activity.media}_360p.mp4/index.m3u8`,
          type: 'application/x-mpegURL'
        });
        this.playervrate.load()
      }, 2500);
    }
  }

  onSave(activityType: any) {
    let ns = this.numSubthemeActive
    let nt = this.numThemeActive
    this.generatedLink = true
    this.saving = true
    this.cardError = ""
    switch (activityType) {
      case "Seleccionador":
        if (this.answer.length <= this.activity.limit && this.answer.length >= this.activity.min) {
          this.answersList[this.numActivity] = this.answer
        } else {
          this.cardError = "Tienes que seleccionar mínimo " + this.activity.min + " campos"
        }
        break;
      case "Seleccionadorv2":
        if (this.answer.length <= this.activity.limit && this.answer.length >= this.activity.min) {
          this.answersList[this.numActivity] = this.answer
        } else {
          this.cardError = "Tienes que seleccionar mínimo " + this.activity.min + " campos"
        }
        break;
      case "Texto":
        if (this.texto == "") {
          this.cardError = "Tienes que rellenar los campos correctamente"
        } else {
          this.answersList[this.numActivity] = this.texto
        }
        break;
      case "Valoracion":
        if (this.answer.length !== this.activity.answers.length) {
          this.cardError = "Tienes que rellenar todos los campos correctamente"
        } else {
          let vacio = false
          for (let index = 0; index < this.answer.length; index++) {
            if (!this.answer[index]) {
              vacio = true
            }
          }
          if (vacio) {
            this.cardError = "Tienes que rellenar todos los campos correctamente"
          } else {
            this.answersList[this.numActivity] = this.answer
          }
        }
        break;
      case "Johari":
        this.answersList[this.numActivity] = ["johari"]
        break;
      case "Lista":
        if (this.listItemsLista.length <= this.activity.limit && this.listItemsLista.length >= this.activity.min) {
          this.answersList[this.numActivity] = this.listItemsLista
        } else {
          this.cardError = "Tienes que seleccionar al menos " + this.activity.min + " respuestas y como mucho " + this.activity.limit
        }
        break;
      case "Feedback":
        this.answersList[this.numActivity] = this.fbTexto
        break;
      case "Video":
        this.answersList[this.numActivity] = ["video"]
        if (this.playerv) {
          this.playerv.dispose()
        }
        break;
      case "Parameters":
        this.answersList[this.numActivity] = ["parameters"]
        break;
      case "Enunciado":
        this.answersList[this.numActivity] = ["enun"]
        break;
      case "VideoRate":
        if (this.answer[0]) {
          this.answersList[this.numActivity] = this.answer
          if (this.playervrate) {
            this.playervrate.dispose()
          }
        } else {
          this.cardError = "Valora el vídeo antes de seguir"
        }
        break;
      case "VideoCheck":
        if (this.videoSeen) {
          this.answersList[this.numActivity] = this.videoSeen
        } else {
          this.cardError = "Checkea si has visto el video antes de seguir"
        }
        break;
      case "Interaction":
        this.answersList[this.numActivity] = ["inter"]
        break;
    }
    if (!this.cardError) {
      this.savingAct = true
      this.saving = true
      this.last = true
      let script: Script = new Script()
      //Enviar respuestas del subtema
      //Ver si hay que hacer update o create
      this.numActivity = 0
      this.userAnswerService.getUserAnswerByUserMts(this.idUserL, this.numMod, nt, ns).subscribe((data: any) => {
        let z = 0
        if (data) {
          this.response = data
          this.userResponse = this.response
          //Actualizar parametros con el update y sera posterior no funciona bien
          this.userResponse.respond.map((data: any) => {
            data.ans = this.answersList[z]
            data.activityType = this.comodin[z]
            z += 1
          })
          this.userAnswerService.updateResponse(this.idUserL, this.numMod, nt, ns, this.userResponse).subscribe((data: any) => {
            this.blockCompleted = true
            this.completed[ns - 1] = true
          }, error => {
          })
          //Si existen las respuestas de este subtema
        } else {
          //Si no existen respuestas del subtema
          let k: Array<any> = []
          for (let index = 0; index < this.answersList.length; index++) {
            k.push({ ans: this.answersList[index], activityType: this.comodin[index] })
          }
          script.idUser = this.idUserL
          script.resp = k
          const a = "0" + this.numMod + "0" + nt + "0" + ns
          script.refAct = a
          this.scriptService.exeScriptAnswers(script).subscribe((data: any) => {
            if (data.result.includes("ok")) {
              this.userResponse.respond = k
              this.userResponse.idUser = this.idUserL
              this.userResponse.module = this.numMod
              this.userResponse.numSubtheme = ns
              this.userResponse.theme = nt
              this.userAnswerService.createResponse(this.userResponse).subscribe((data: any) => {
                this.blockCompleted = true
                this.completed[ns - 1] = true
                const dataMaxSubtheme = this.datModService.getMaxSubthemes()
                if (dataMaxSubtheme[this.numMod - 1][nt - 1] == ns) {
                  this.userProgressService.updateUserProgress(this.idUserL, "pt", this.numMod - 1, nt - 1).subscribe((progress: any) => {

                  })
                } else {
                  this.userProgressService.updateUserProgress(this.idUserL, "ps", this.numMod - 1, nt - 1).subscribe((progress: any) => {

                  })
                }
              }, error => {
                console.log(error)
              })

            } else {

            }

          }, error => {
            console.log(error)
          })
        }
        setTimeout(() => {
          this.savingAct = false
        }, 150);
      })

    }
    this.saving = false
    this.linkJohariShow = false
    this.interactionShow = false
    this.interactionResult = []
  }

  refreshVideo(i: any) {

    if (i == 1) {
      if (this.playerv) {
        this.playerv.dispose()
      }
      this.playerv = videojs('videonormal')
      this.playerv.load()
      this.playerv.src({
        src: `https://hls.growthroad.es/${this.activity.media}_360p.mp4/index.m3u8`,
        type: 'application/x-mpegURL'
      });
      this.playerv.load()
      this.playerv.play()
    } else if (i == 2) {
      if (this.playervrate) {
        this.playervrate.dispose()
      }
      this.playervrate = videojs('videorate')
      this.playervrate.load()
      this.playervrate.src({
        src: `https://hls.growthroad.es/${this.activity.media}_360p.mp4/index.m3u8`,
        type: 'application/x-mpegURL'
      });
      this.playervrate.load()
      this.playervrate.play()
    }
  }
}

//Pantallita de guardado
      //https://codepen.io/imprakash/pen/GgNMXO aqui se puede cositas y poner el boton con lo de arriba
