import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Mail } from 'src/app/models/mail.model';

@Injectable({
  providedIn: 'root'
})
export class MailersService {

  constructor(private httpClient: HttpClient) { }

  sendUrl(mail: Mail): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/sendUrl`, mail).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  sendEmailPwd(name: string, token: any, email: String): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/user/send/emailpwd`, {
      nameUser: name,
      token: token,
      email: email
    }).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
}
