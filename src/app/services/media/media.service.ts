import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private httpClient: HttpClient) { }


  // getVideo(vid: any, ext: any): Observable<any> {
  //   const params = {vid: vid, ext: ext}
  //   return this.httpClient.get(`${environment.apiUrl}/video`, {params: params, responseType: 'blob',observe: 'response', reportProgress: true,})


  // }
}
