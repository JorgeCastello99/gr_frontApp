import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private cookieService: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('token')

    let request = req;
    if (token) {
    request = req.clone({
    setHeaders: {
    authorization: `Bearer ${token}`
    }
    });
    }
    console.log(request.url)
    return next.handle(request);
    }
}
