import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  loginUser(user: User): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/user/login`, user).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/user/pwd/forgot`, {email: email}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  updatePassword(idUser: string, password: String): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/user/pwd/update`, {idUser: idUser, password: password}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  checkCodePwd(idUser: any, token: any): Observable<any> {
    const params = { idUser: idUser, token: token}
    return this.httpClient.get(`${environment.apiUrl}/user/check/emailpwd`, {params: params}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  addCodeKey(id: string): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/user/codekeys/generate`, {idUser: id}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  checkCodeKey(id: string, codeKey: any): Observable<any> {
    const params = {
      idUser: id,
      codeKey: codeKey
    }
    return this.httpClient.get(`${environment.apiUrl}/user/codekeys/check`, {params: params}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  getUser(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/user/${id}`).pipe(
      catchError(error => {
        return error
      })
    )
  }
  getUsersByGrade(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/users/grade/${id}`).pipe(
      catchError(error => {
        return error
      })
    )
  }

  updateUserName(idUser: any, userName: any, userSurName: any): Observable<any> {
    const params ={idUser: idUser, userName: userName, userSurName: userSurName}
    return this.httpClient.put(`${environment.apiUrl}/user/update/name`,["hola"],{params: params}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  updatePwdCheck(idUser: any,  upPwdOld: any, upPwdNew: any, upPwdNewR: any,): Observable<any> {
    const params ={idUser: idUser, upPwdOld: upPwdOld,  upPwdNew: upPwdNew, upPwdNewR: upPwdNewR,}
    return this.httpClient.put(`${environment.apiUrl}/user/update/pwd`,["hola"],{params: params}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  //Updatear
  updateCodes(idUser: any): Observable<any> {
    const params ={idUser: idUser}
    return this.httpClient.put(`${environment.apiUrl}/user/codes/update`,["hola"],{params: params}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
}
