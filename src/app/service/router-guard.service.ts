import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {AuthService} from './auth.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private auth: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isExpired() || !this.auth.hasRoles(route.data.expectedRoles)) {
      return false;
    }
    return true;
  }
}
