// @ts-check
import { UserparametersService } from './../../services/userparameters/userparameters.service';
import { UserService } from './../../services/user/user.service';
import { ScriptsService } from './../../services/scripts/scripts.service';
import { UseranswerService } from './../../services/useranswer/useranswer.service';
import { UserAnswer } from './../../models/useranswer.model';
import { DataModService } from './../../services/mod/data-mod.service';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Script } from 'src/app/models/script.model';
import { UserProgressService } from 'src/app/services/userprogress/userprogress.service';

@Component({
  selector: 'app-vocation',
  templateUrl: './vocation.component.html',
  styleUrls: ['./vocation.component.scss'],
})
export class VocationComponent implements OnInit {
  modList: any;
  licenciaid = 'B';
  themeList: any;

  percents = [0, 0, 0, 0, 0, 0];
  idUser: any;

  finS: any;
  finT: any;

  userProgressT: any;
  userProgressS: any;

  arrayProgressSTotal = [0, 0, 0, 0, 0, 0];
  arrayProgressS = [0, 0, 0, 0, 0, 0];
  subtemas = 0;
  imagenArrayA = [
    'https://grapi.growthroad.es:5555/img?imgRef=capitulo_1_block&ext=png',
    'https://grapi.growthroad.es:5555/img?imgRef=capitulo_2_block&ext=png',
    'https://grapi.growthroad.es:5555/img?imgRef=capitulo_3_block&ext=png',
    'https://grapi.growthroad.es:5555/img?imgRef=capitulo_4_block&ext=png',
    'https://grapi.growthroad.es:5555/img?imgRef=capitulo_5_block&ext=png',
    'https://grapi.growthroad.es:5555/img?imgRef=capitulo_6_block&ext=png',
  ];
  user: any;
  name: any;
  license: any;

  constructor(
    private userProgressService: UserProgressService,
    private userService: UserService,
    private scriptService: ScriptsService,
    public jwthelper: JwtHelperService,
    private cookieService: CookieService,
    private dataModService: DataModService,
    private respondService: UseranswerService,
    private parametersService: UserparametersService
  ) {

  }

  ngOnInit(): void {
    let token = this.cookieService.get('token');
    let decoded = this.jwthelper.decodeToken(token);
    this.idUser = decoded.sub;
    this.modList = this.dataModService.getMods();

    this.userService.getUser(decoded.sub).subscribe((data) => {
      this.user = data;
      this.license = this.user.license;
    });

    this.modList = this.dataModService.getMods();
    this.finS = this.dataModService.getMaxSubthemes();
    this.finT = this.dataModService.getMaxThemes();
    this.arrayProgressSTotal = this.dataModService.getMaxSubTotal();

    this.userProgressService.getUserProgress(this.idUser).subscribe(
      (data) => {
        this.userProgressT = data.progressThemes;
        this.userProgressS = data.progressSubthemes;

        console.log(this.userProgressS);
        console.log(this.finS);

        for (let i = 0; i < this.userProgressS.length; i++) {
          for (let x = 0; x < this.userProgressS[i].length; x++) {
            //Si queremos contar el tota de subtemas: this.arrayProgressSTotal[i]+= this.finS[i][x]

            if (this.userProgressS[i][x] > 0) {
              this.arrayProgressS[i] += this.userProgressS[i][x];
            } else {
              break;
            }
          }
        }
        console.log(this.arrayProgressS);
        console.log(this.arrayProgressSTotal);
      },
      (error) => {}
    );
  }
}
