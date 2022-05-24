import { Interaction } from './../../models/interaction.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private httpClient: HttpClient) { }

  createInteraction(interaction: Interaction): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/interaction/create`, interaction).pipe(
      catchError(error => {
        return error
      })
    )
  }
  addInteraction(interaction: Interaction): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/interaction/add`,interaction).pipe(
      catchError(error => {
        return error
      })
    )
  }
  getInteraction(idUser: string): Observable<any> {
    const params = {idUser: idUser}
    return this.httpClient.get(`${environment.apiUrl}/interaction/get`,{params: params}).pipe(
      catchError(error => {
        return error
      })
    )
  }
  checkInteraction(idUser: string): Observable<any> {
    const params = {idUser: idUser}
    return this.httpClient.get(`${environment.apiUrl}/interaction/check`,{params: params}).pipe(
      catchError(error => {
        return error
      })
    )
  }
}
