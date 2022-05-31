import { Script } from '../../models/script.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {

  constructor(private httpClient: HttpClient) { }

  exeScriptAnswers(script: Script): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/exe/answers`, script).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  // exeScriptReport(script: Script): Observable<any> {
  //   return this.httpClient.put(`${environment.apiUrl}/exe/report`,script).pipe(
  //     catchError(error => {
  //       return throwError(error);
  //     })
  //   )
  // }

  exeScriptReport(idUser: any, userName: any): any {
    const body = {
      idUser: idUser, userName: userName, responseType: 'arraybuffer' as 'json'
    }
    const params = { idUser: idUser, userName: userName }
    return this.httpClient.put(`${environment.apiUrl}/exe/report`, body).pipe()
    // return this.httpClient.get(`${environment.apiUrl}/exe/report`, { params: params, responseType: 'arraybuffer' as 'json' }).pipe()
  }

}
// }
// this.scriptService.exeScriptReport(this.idUserL, this.userName).subscribe((data: any)=>{
//   let file = new Blob([data], { type: 'application/pdf' });
//   var fileURL = URL.createObjectURL(file);
//   window.open(fileURL);
// }
