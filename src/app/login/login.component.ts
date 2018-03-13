import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
  }

  onSuccess(token: string) {
    this.userService.signInUsingGoogle(token)
      .subscribe((response) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });
      });
  }
}
