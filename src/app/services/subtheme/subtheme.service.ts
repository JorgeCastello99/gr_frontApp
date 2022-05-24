import { Subtheme } from './../../models/subtheme.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubthemeService {

  constructor(private httpClient: HttpClient) { }

  getSubthemes(module: any, theme: any): Observable<any> {
    const params = {module: module, theme: theme}
    return this.httpClient.get(`${environment.apiUrl}/subthemes/mod/theme`, {params: params}).pipe(
      catchError(error => {
        return error
      })
    )
  }
  getSubtheme(module: any, theme: any, subtheme: any): Observable<any> {
    const params = {module: module, theme: theme, numSubtheme: subtheme}
    return this.httpClient.get(`${environment.apiUrl}/subtheme/mod/theme/st`, {params: params}).pipe(
      catchError(error => {
        return error
      })
    )
  }
}
