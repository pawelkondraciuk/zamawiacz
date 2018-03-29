import { User } from './../models/user';
import { UserDataService } from './user-data.service';
import { Injectable, NgZone } from '@angular/core';
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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  public static SESSION_STORAGE_KEY = 'accessToken';

  private _isLoggedIn = false;
  private user: User;
  private authToken: string;

  public isLoggedIn$ = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient,
    private userDataService: UserDataService,
    private googleAuth: GoogleAuthService,
    private router: Router,
    private ngZone: NgZone,
  ) {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      const { user, token } = JSON.parse(localStorage.getItem('currentUser'));
      this.user = user || null;
      this.authToken = token || null;
      this.isLoggedIn = this.user ? true : false;
    }
  }

  public getGoogleAuth(): Observable<gapi.auth2.GoogleAuth> {
    return this.googleAuth.getAuth();
  }

  get isLoggedIn(): boolean {
    return this.user && !!this.authToken;
  }

  set isLoggedIn(value: boolean) {
    this._isLoggedIn = true;
    this.isLoggedIn$.next(true);
  }

  // doesnt work ;<
  public getLoginSubject(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  public getToken(): string {
    return this.user && this.authToken;
  }

  public getUserData() {
    return this.user;
  }

  public updateCurrentUserData() {
    if (!this.isLoggedIn) {
      return;
    }

    this.userDataService.getCurrentUserData()
      .subscribe((userData: User) => {
        this.user = userData;
      });
  }

  public signInUsingGoogle(token: string) {
    return this.httpClient.post('/auth/google', { token })
      .do((response: any) => {
        this.user = response;
        this.isLoggedIn$.next(true);
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.navigateWorkaroundForAngularIssue('/orders');
      })
      .map((response) => response['user']);
  }

  public signOut() {
    return this.getGoogleAuth()
      .do(auth => {
        this.user = null;
        localStorage.removeItem('currentUser');
        this.isLoggedIn$.next(false);
        auth.signOut();
        this.navigateWorkaroundForAngularIssue('/user');
      }).subscribe();
  }

  // workaround for Issue #18254
  // https://github.com/angular/angular/issues/18254
  private navigateWorkaroundForAngularIssue(route: string): void {
    this.ngZone.run(() => {
      this.router.navigateByUrl(route);
    });
  }
}
