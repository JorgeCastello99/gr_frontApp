import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataUserService {

  constructor() { }

  private user: any

  setUser(data: any) {
    this.user = data
  }

  getUser(){
    return this.user
  }
}
