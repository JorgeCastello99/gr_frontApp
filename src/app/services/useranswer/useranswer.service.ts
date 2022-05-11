import { UserAnswer } from './../../models/useranswer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UseranswerService {

  constructor(private httpClient: HttpClient) { }
  //Vocation
  getUserAnswerByUserMts(idUser: any, module: any, theme: any, numSubtheme: any): Observable<any> {
    const params ={idUser: idUser,  module: module, theme: theme, numSubtheme: numSubtheme }
    return this.httpClient.get(`${environment.apiUrl}/useranswer/user/mts`,{params: params}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  //Vocation
  getUserAnswerByUserMt(idUser: any, module: any, theme: any): Observable<any> {
    const params ={idUser: idUser,  module: module, theme: theme }
    return this.httpClient.get(`${environment.apiUrl}/useranswer/user/mt`,{params: params}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  //Home y vocation
  getUserAnswerByUser(idUser: any): Observable<any> {
    const params ={idUser: idUser}
    return this.httpClient.get(`${environment.apiUrl}/answers/user/id`,{params: params}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  //Updatear desde la actividad usuario
  updateResponse(idUser: any, module: any, theme: any, numSubtheme: any, respond: any): Observable<any> {
    const params ={idUser: idUser,  module: module, theme: theme, numSubtheme: numSubtheme }
    return this.httpClient.put(`${environment.apiUrl}/useranswer/update`,respond,{params: params}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  //Crear respuesta desde actividad
  createResponse(userAnswer: UserAnswer): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/useranswer/register`,userAnswer).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
}
