import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private httpClient: HttpClient) { }

  getSchool(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/school/${id}`).pipe(
      catchError(error => {
        return error
      })
    )
  }
}
