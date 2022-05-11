import { CookieService } from 'ngx-cookie-service';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-profesion',
  templateUrl: './profesion.component.html',
  styleUrls: ['./profesion.component.scss']
})
export class ProfesionComponent implements OnInit, AfterViewInit, OnDestroy {
  player: any
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.player = videojs('videoprof')
      this.player.src({
        src: `https://hls.growthroad.es/intro_prof_360p.mp4/index.m3u8`,
        type: 'application/x-mpegURL'
      });
      this.player.load()
    }, 500);

  }
  ngOnDestroy(): void {
    this.player.dispose()
  }

}
