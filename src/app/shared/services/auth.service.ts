import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  public loggedIn(): boolean {
    return Boolean(localStorage.getItem('currentUser'));
  }

  logOutUser() {
    if (this.loggedIn()) {
      localStorage.removeItem('currentUser');
      return true;
    }

    return true;
  }

  logIn() {
    window.open('/auth/google', 'myWindow', 'width=450,height=600');
  }

}
