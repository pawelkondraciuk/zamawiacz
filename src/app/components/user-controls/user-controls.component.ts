import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';

import { AuthService } from './../../shared/services/auth.service';
import { Subscription } from 'apollo-client/util/Observable';

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
      .subscribe(data => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.user.name;
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
