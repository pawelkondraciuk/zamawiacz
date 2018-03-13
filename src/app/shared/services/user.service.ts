import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig,
} from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  public static SESSION_STORAGE_KEY = 'accessToken';
  private user: { user: any; token: string };

  constructor(
    private httpClient: HttpClient,
    private googleAuth: GoogleAuthService,
    private router: Router,
  ) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  public isLoggedIn(): boolean {
    return this.user && !!this.user.token;
  }

  public getToken(): string {
    return this.user && this.user.token;
  }

  public signInUsingGoogle(token: string) {
    return this.httpClient.post('/auth/google', { token })
      .do((response: any) => {
        this.user = response;
        localStorage.setItem('currentUser', JSON.stringify(this.user));
      })
      .map((response) => response['user']);
  }

  public signOut() {
    this.googleAuth.getAuth()
      .subscribe(auth => {
        this.user = null;
        localStorage.removeItem('currentUser');
        auth.signOut();
        this.router.navigateByUrl('/login');
      });
  }
}
