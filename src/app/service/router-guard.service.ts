import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

import {AuthService} from './auth.service';
/**
 * The class CanActivateRouteGuard implements CanActivate.
 */
@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  /**
   * The method checks the user rights and whether the token has expired.
   *
   * @return boolean can activate
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.auth.isExpired() || !this.auth.hasRoles(route.data.expectedRoles)) {
      return false;
    }
    return true;
  }
  /**
   * Creates a new default object CanActivateRouteGuard
   * @constructor
   */
  constructor(private auth: AuthService, public router: Router) {
  }

}
