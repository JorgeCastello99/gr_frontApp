import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, private cookieService: CookieService) { }
  // ...
  public isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
