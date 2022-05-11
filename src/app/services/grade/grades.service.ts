import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Grade } from 'src/app/models/grade.model';
@Injectable({
  providedIn: 'root'
})
export class GradesService {

  constructor(private httpClient: HttpClient) { }

  getGradesBySchool(id: string): Observable<any>{
    return this.httpClient.get(`${environment.apiUrl}/grades/school/${id}`).pipe(
      catchError(error => {
        return error
      })
    )
  }
  registerGrade(grade: Grade): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/grade/register`, grade).pipe(
      catchError(error => {
        return throwError(error);
      })
    )
  }

  deleteGrade(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/grade/${id}`).pipe(
    catchError(error => {
    return error;
    })
    );
    }

}
