import { InteractionService } from './../../services/interactions/interaction.service';
import { UseranswerService } from './../../services/useranswer/useranswer.service';
import { UserService } from './../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CryptoService } from './../../services/crypto/crypto.service';
import { environment } from 'src/environments/environment';
import crypto from "crypto-js"
import { utf8Encode } from '@angular/compiler/src/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Interaction } from 'src/app/models/interaction.model';
@Component({
  selector: 'app-interaction',
  templateUrl: './interaction.component.html',
  styleUrls: ['./interaction.component.scss']
})
export class InteractionComponent implements OnInit {
  x: any
  nameStudent = ""
  numberProgress: number
  typeUser: String
  backShow = false
  userAnswers: Array<any> = []

  // options = ["Abierta", "Activa", "Ágil de mente", "Agresiva", "Amable", "Ambiciosa", "Analítica",
  //   "Asertiva", "Atenta", "Auténtica", "Capaz", "Con carácter", "Cauta", "Clara", "Coherente", "Colaboradora",
  //   "Comunicadora", "Conciliadora", "Consciente", "Constante", "Constructiva", "Con control", "Emocional",
  //   "Convincente", "Cooperativa", "Cordial", "Creativa", "Coherente",
  //   "Con criterio",
  //   "Critica",
  //   "Cuidadosa",
  //   "Culta",
  //   "Cumplidora",
  //   "Decidida",
  //   "Desenvuelta",
  //   "Dialogante",
  //   "Discreta",
  //   "Educada",
  //   "Eficaz",
  //   "Eficiente",
  //   "Emprendedora",
  //   "Enérgica",
  //   "Entusiasta",
  //   "Ética",
  //   "Exigente",
  //   "Extrovertida",
  //   "Flexible",
  //   "Formal",
  //   "Hábil",
  //   "Honesta",
  //   "Imaginativa",
  //   "Independiente",
  //   "Justa",
  //   "Leal",
  //   "Capacidad de líder",
  //   "Lógica",
  //   "Madura",
  //   "Matemática",
  //   "Mecánica",
  //   "Con memoria",
  //   "Metódica",
  //   "Minuciosa",
  //   "Motivadora",
  //   "Negociadora",
  //   "Objetiva",
  //   "Organizada",
  //   "Ordenada",
  //   "Paciente",
  //   "Persistente",
  //   "Persuasiva",
  //   "Polivalente",
  //   "Positiva",
  //   "Práctica",
  //   "Precavida",
  //   "Puntual",
  //   "Rápida",
  //   "Razonable",
  //   "Con recursos",
  //   "Reflexiva",
  //   "Respetuosa",
  //   "Responsable",
  //   "Resolutiva",
  //   "Segura",
  //   "Sensata",
  //   "Sensible",
  //   "Serena",
  //   "Sincera",
  //   "Prudente",
  //   "No problemática",
  //   "Tenaz",
  //   "Tolerante",
  //   "Voluntariosa",
  // ]
  numActivity = 1
  answersOpinion: Array<any> = []
  valueInp = ""
  errorAct = ""
  targetInput: any
  interaction: Interaction = new Interaction()
  failCode= false
      //Control video
      @ViewChild('videos')
      public videoSb: ElementRef | undefined;
      //Control pre full screen
      @ViewChild('videoschange')
      public videoSbChange: ElementRef | undefined;
      //Control volumen
      volumeBar = 1
      //Comodin de arriba
      volCom = 0
      //Enseñar calidades
      showQual = false
      //Control duracion
      seekBar = 0
      //Calidad del video none array
      videoQual = 480
      //Full screen
      fullScreen = false
      //Play pause
      imgPp = "play-button"
      //Mute volumen
      imgMute = "alto-volumen"
  constructor(private activatedRouter: ActivatedRoute,
    private cryptoService: CryptoService,
    private userService: UserService,
    private userAnswerService: UseranswerService,
    private interactionService: InteractionService
  ) {
    this.typeUser = ""
    this.numberProgress = 1
  }

  ngOnInit(): void {
      this.activatedRouter.queryParams.subscribe((params: any) => {
      console.log(params)
      let z = params.tok
      z = z.toString().replace(/p1L2u3S/g, '+').replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=')
      const a = this.cryptoService.get(environment.secretKey, z)
      console.log(a)
      try{
        this.x = JSON.parse(a)
      console.log(this.x)
      this.userService.checkCodeKey(this.x.idUser, this.x.codekey).subscribe(result=>{
        console.log(result)
        if(result.result == true){
          this.userService.getUser(this.x.idUser).subscribe(data => {
            this.nameStudent = data.name
          })
          //aplicar el tema y subtema que toque
          this.interactionService.getInteraction(this.x.idUser).subscribe(result=>{
            this.userAnswers = result.optionsName
          })
        } else {
          this.failCode = true
        }
      },error=>{
        console.log(error)
        this.failCode = true
      })
      } catch (err) {
        this.failCode = true
      }


    }, (error: any) => {
      console.log(error)
    }
    );
  }

    //Reproductor
    dragDown() {
      if (this.videoSb) {
        this.videoSb.nativeElement.pause()

      }
    }
    dragUp() {
      if (this.videoSb) {
        this.videoSb.nativeElement.play()
      }
    }
    changeDuration() {

      this.imgPp = "pause-button"
      if (this.videoSb) {

        let time = this.videoSb.nativeElement.duration * (this.seekBar / 100)
        console.log(time)

        try {
          this.videoSb.nativeElement.pause()
          console.log(this.videoSb.nativeElement)
          setTimeout(() => {

          }, 300);
          this.videoSb.nativeElement.currentTime = Math.ceil(time)
          this.videoSb.nativeElement.play()
        } catch (error) {
          console.log(error)
        }

      }


    }

    muteVideo() {
      if (this.videoSb) {
        if (this.videoSb?.nativeElement.muted == false) {
          this.videoSb.nativeElement.muted = true
          this.imgMute = "mute"
          this.volCom = this.volumeBar
          this.volumeBar = 0
        } else {
          this.videoSb.nativeElement.muted = false
          this.imgMute = "alto-volumen"
          this.volumeBar = this.volCom
          this.volCom = 0
        }
      }


    }
    showQuals() {
      this.showQual = !this.showQual

    }
    changeQual(q: any) {
      this.videoQual = q
      this.videoSb?.nativeElement.load()
      this.videoSb?.nativeElement.play()
      this.imgPp = "pause-button"
      setTimeout(() => {
        this.showQual = false
      }, 1000);


    }

    fullVideo() {
      if (this.videoSbChange) {
        if (!this.fullScreen) {
          if (this.videoSbChange?.nativeElement.requestFullscreen) {
            this.videoSbChange.nativeElement.requestFullscreen()
          } else if (this.videoSbChange.nativeElement.mozRequestFullScreen) {
            this.videoSbChange.nativeElement.mozRequestFullScreen()
          }
          else if (this.videoSbChange.nativeElement.webkitRequestFullscreen) {
            this.videoSbChange.nativeElement.webkitRequestFullscreen()
          }
          else if (this.videoSbChange.nativeElement.msRequestFullscreen) {
            this.videoSbChange.nativeElement.msRequestFullscreen()
          }
        } else {
          document.exitFullscreen();
        }
        this.fullScreen = !this.fullScreen
      }
    }

    changeVolume() {
      if (this.videoSb) {
        if (this.volumeBar === 0) {
          this.videoSb.nativeElement.muted = true
          this.imgMute = "mute"
        } else {
          this.videoSb.nativeElement.muted = false
          this.imgMute = "alto-volumen"
        }
      }
    }
    playPause() {
      if (this.videoSb) {
        this.showQual = false
        if (this.videoSb?.nativeElement.paused) {
          if (this.videoSb?.nativeElement.duration == this.videoSb?.nativeElement.currentTime) {
            this.videoSb.nativeElement.currentTime = 0
          }
          this.videoSb.nativeElement.play()
          this.imgPp = "pause-button"
        } else {
          this.videoSb.nativeElement.pause()
          this.imgPp = "play-button"
        }
      }

    }
    timeUpdVideo() {
      var value = (100 / this.videoSb?.nativeElement.duration) * this.videoSb?.nativeElement.currentTime;
      this.seekBar = value;
      if (this.videoSb?.nativeElement.duration == this.videoSb?.nativeElement.currentTime) {
        this.imgPp = "play-button"
      }

    }


  moveBack() {
      this.numberProgress--
      this.valueInp = ""
      this.answersOpinion = []
      this.numActivity = 1
  }
  moveNext() {

    if (!this.valueInp) {
      this.errorAct = "Selecciona alguna respuesta"
    } else {
      this.answersOpinion[this.numActivity - 1] = this.valueInp
      this.valueInp = ""
      this.targetInput.target.checked = false
      this.numActivity++
      console.log(this.answersOpinion)

    }
  }
  saveOpinions(){
    if (!this.valueInp) {
      this.errorAct = "Selecciona alguna respuesta"
    } else {
      this.answersOpinion[this.numActivity - 1] = this.valueInp
      this.valueInp = ""
      this.targetInput.target.checked = false
      this.numActivity = 1
      this.interaction.idUser = this.x.idUser
      this.interaction.respond = this.answersOpinion
      this.interactionService.addInteraction(this.interaction).subscribe(data=>{
        console.log(data)
      })
      this.numberProgress++


    }
  }

  remake(){
    this.numberProgress = 1
    this.numActivity = 1
    this.answersOpinion= []
    this.valueInp = ""
  }

  changeInput(e: any) {
    this.errorAct = ""
    this.valueInp = e.target.value
    this.targetInput = e
  }

  chooseTypeUser(tUser: any) {
    this.numberProgress += 1
    this.typeUser = tUser
    this.backShow = true
  }

  continue() {
    this.numberProgress++
  }

  back() {
    this.numberProgress--
  }
}
