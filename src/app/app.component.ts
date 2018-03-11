import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      console.log(JSON.parse(localStorage.getItem('currentUser')));
    }
  }

  public logOut() {
    this.authService.logOutUser();
  }

  logIn() {
    this.authService.logIn();
  }

}
