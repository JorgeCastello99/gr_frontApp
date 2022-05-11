import { CookieService } from 'ngx-cookie-service';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {
  player: any
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.player = videojs('videoexp')
      this.player.src({
        src: `https://hls.growthroad.es/intro_exp_360p.mp4/index.m3u8`,
        type: 'application/x-mpegURL'
      });
      this.player.load()
    }, 500);

  }
  ngOnDestroy(): void {
    this.player.dispose()
  }

}
