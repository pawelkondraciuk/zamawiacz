import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;

    return this.handleAuth(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    return this.handleAuth(url);
  }

  private handleAuth(url: string): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    }

    this.router.navigateByUrl('/login');

    return false;
  }
}
