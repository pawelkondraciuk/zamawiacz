import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const token = JSON.parse(localStorage.getItem('currentUser')) ? JSON.parse(localStorage.getItem('currentUser')).token : null;

    if (token) {
      // this.authService.signInUsingGoogle(token)
      //   .subscribe();
      this.authService.isLoggedIn$.next(true);
    }
  }
}
