import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserparametersService {

  constructor(private httpClient: HttpClient) { }
  getUserParameters(idUser: any): Observable<any> {
    const params ={idUser: idUser}
    return this.httpClient.get(`${environment.apiUrl}/parameters/user`,{params: params}).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }
}
