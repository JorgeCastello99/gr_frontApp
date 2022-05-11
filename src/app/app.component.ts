import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'frontApp';
  logued = false

  constructor(private router: Router, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        if (route.url.includes("home")) {
          this.logued = true
        } else {
          this.logued = false
        }
      }

    })

  }


  @HostListener('window:beforeunload')
  setToSession(): void {
    const token = this.cookieService.get("token")

    sessionStorage.setItem('tempToken', JSON.stringify(token));
  }

  @HostListener('window:load')
  clearLocalStorage(): void {
    const session = sessionStorage.getItem('tempToken');
    const remember = this.cookieService.get("remember")
    if (remember == "false" && session == null) {
     this.cookieService.deleteAll()

    }
  }
}
