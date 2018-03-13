import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
  }

  onSuccess(token: string) {
    this.authService.signInUsingGoogle(token)
      .subscribe((response) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });
      });
  }
}
