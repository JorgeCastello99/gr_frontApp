import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataModService {

  constructor() { }
  idMod: any

  modList = [{
    name: 'Vocación y propósito',
    num: '1',
    img: '../../../assets/img/LOGO_GR_FONDO_claro.png',
    // progress: '70%'
  },
  {
    name: '¿Cómo tomar decisiones?',
    num: '2',
    img: '../../../assets/img/LOGO_GR_FONDO_claro.png',
    // progress: '70%'
  },
  {
    name: 'Identidad',
    num: '3',
    img: '../../../assets/img/LOGO_GR_FONDO_claro.png',
    //   progress: '70%'
  },
  {
    name: '¿Cómo aprendemos?',
    num: '4',
    img: '../../../assets/img/LOGO_GR_FONDO_claro.png',
    // progress: '40%'
  },
  {
    name: 'Desarrollo personal',
    num: '5',
    img: '../../../assets/img/LOGO_GR_FONDO_claro.png',
    // progress: '70%'
  },
  {
    name: 'Orientación académica',
    num: '6',
    img: '../../../assets/img/LOGO_GR_FONDO_claro.png',
    // progress: '100%'
  },
  ]

  maxThemes = [5,2,9,4,6,5]


  themeList = [
    [
      {
        name: '¿QUÉ ES LA VOCACIÓN?',
        num: '1',
      },
      {
        name: 'MI GRAN SUEÑO',
        num: '2',
      },
      {
        name: 'VALORES PROFESIONALES',
        num: '3',
      },
      {
        name: 'HOBBIE VS PROFESIÓN',
        num: '4',
      },
      {
        name: 'PROPÓSITO DE VIDA',
        num: '5',
      }
    ], //segundo modulo
    [
      {
        name: '¿CÓMO TOMAR DECISIONES?',
        num: '1',
      },
      {
        name: 'MIEDOS',
        num: '2',
      }
    ], //tercer modulo
    [
      {
        name: 'VALORES',
        num: '1',
      },
      {
        name: 'INTERESES Y PASIONES',
        num: '2',
      },
      {
        name: '¿QUIÉN SOY?',
        num: '3',
      },
      {
        name: 'VENTANA DE JOHARI',
        num: '4'
      },

      {
        name: 'COMPETENCIAS',
        num: '5',
      },
      {
        name: 'TALENTOS Y FORTALEZAS',
        num: '6',
      },
      {
        name: 'EL RETO DE SER UNA PERSONA',
        num: '7'
      },
      {
        name: 'IDENTIDAD REAL VS IDENTIDAD DIGITAL',
        num: '8'
      },
      {
        name:'IKIGAI',
        num: '9'
      }

    ], // CUARTO MODULO
    [
      {
        name: 'CAMBIO DE MIRADA',
        num: '1',
      },
      {
        name: '¿CÓMO APRENDEMOS MEJOR?',
        num: '2',
      },
      {
        name: 'ESTILOS DE APRENDIZAJE',
        num: '3',
      },
      {
        name: 'ESTRATEGIAS DE PENSAMIENTO',
        num: '4',
      }
    ],//MODULO 5
    [
      {
        name: '¿SABES ESCUCHAR?',
        num: '1',
      },
      {
        name: 'LA ASERTIVIDAD',
        num: '2',
      },
      {
        name: 'COMUNICACIÓN EFECTIVA',
        num: '3',
      },
      {
        name: 'EMPATÍA',
        num: '4',
      },
      {
        name: 'SOLUCIÓN DE PROBLEMAS',
        num: '5',
      },
      {
        name: 'UN CORAZÓN INTELIGENTE',
        num: '6',
      }
    ],
    [ //MODULO 6
      {
        name: 'DE QUE VA LO QUE QUIERO ESTUDIAR',
        num: '1',
      },
      {
        name: 'ITINERARIOS EDUCATIVOS',
        num: '2',
      },
      {
        name: 'ESTUDIOS DEL FUTURO',
        num: '3',
      },
      {
        name: 'FORMACIÓN PROFESIONAL O UNA CARRERA UNIVERSITARIA: ¿QUÉ ELIJO?',
        num: '4',
      },
      {
        name:'ESTUDIO INTERNACIONAL',
        num:'5'
      }
    ],
  ]

  maxSubTotal= [12,7,34,20,24,14]
  maxSubThemes = [[4,1,3,1,3],
    [5,2],
    [4,3,4,9,4,2,2,3,3],
    [9,2,5,4],
    [6,6,3,2,2,5],
    [2,2,3,5,2]
  ]
  paramAVK = ["Auditivo","Visual","Kinestésico"]
  paramInteM = ["Lingüistica","Lógico-Matemáticas","Espacial","Cinética-Corporal","Musical","Interpersonal","Intrapersonal","Naturalista"]
  paramProf = ["Técnico-Manual", "Científico-Investigador", "Artístico-Creativo", "Social-Asistencial", "Empresarial-Persuasivo", "Administración-Gestión", "Digital/Virtual-Streamer"]
  paramVoc = ["Técnico", "Investigador", "Emprendedor", "Comunicador", "Analista"]
  paramPer = ["Perfeccionista", "Altruista","Activo","Afectivo","Racional","Escéptico","Entusiasta","Líder","Mediador"]
  paramInteE = ["Autoconciencia","Empatía","Autoconfianza","Motivación","Autocontrol","Habilidades Sociales"]
  paramEstApr = ["Activo","Teórico","Reflexivo","Pragmático"]


  getMaxSubTotal(){
    return this.maxSubTotal
  }
  getParamsEstApr(){
    return this.paramEstApr
  }
  getParamsInteE(){
    return this.paramInteE
  }
  getParamsPer(){
    return this.paramPer
  }
  getParamProf(){
    return this.paramProf
  }
  getParamVoc(){
    return this.paramVoc
  }

  getParamIntem(){
    return this.paramInteM
  }
  getParamAVK(){
    return this.paramAVK
  }

  getMaxSubthemes(){
    return this.maxSubThemes
  }
  getMaxThemes(){
    return this.maxThemes
  }
  getMods(){
    return this.modList
  }

  getThemes(){
    return this.themeList
  }
}
