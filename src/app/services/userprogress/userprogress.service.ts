import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserProgress } from '../../models/userprogress.model'

@Injectable({
  providedIn: 'root'
})
export class UserProgressService {

  constructor(private httpClient: HttpClient) { }

  getUserProgress  (idUser: any): Observable<any> {
    const params ={idUser: idUser}
    return this.httpClient.get(`${environment.apiUrl}/user/progress/get`,{params: params}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
  updateUserProgress (idUser: String, flag: String, positionT: any, positionS: any): Observable<any>{
    const params = {
      idUser: idUser,
      flag: flag,
      positionT: positionT,
      positionS: positionS
    }
    return this.httpClient.put(`${environment.apiUrl}/user/progress/update`, params ).pipe(
      catchError(error=> {
        return throwError(error)
      })
    )
  }
}
