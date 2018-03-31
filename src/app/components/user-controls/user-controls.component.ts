import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';

import { Subscription } from 'apollo-client/util/Observable';

import { AuthService } from './../../shared/services/auth.service';
import { LoginUserData } from './../../shared/models/user';


@Component({
  selector: 'app-user-controls',
  templateUrl: './user-controls.component.html',
  styleUrls: ['./user-controls.component.css']
})
export class UserControlsComponent implements OnInit, OnDestroy {
  public userLoggedIn: boolean;
  public username: string;

  private isLoggedSubscription$: Subscription;

  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.isLoggedSubscription$ = this.authService.isLoggedIn$
      .subscribe((isLogged: boolean) => {
        this.userLoggedIn = isLogged;
        this.username = isLogged ? this.authService.getUserData().name : null;
      });
  }

  onLoginSuccess(token: string) {
    this.authService.signInUsingGoogle(token)
      .subscribe((data: LoginUserData) => {
        this.username = data.name;
        this.cdRef.detectChanges();
      });
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.isLoggedSubscription$.unsubscribe();
  }

}
