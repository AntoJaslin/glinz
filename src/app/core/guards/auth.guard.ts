import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkToken(route);
  }
  canLoad(route: Route, next: ActivatedRouteSnapshot): boolean {
    return this.checkToken(next);
  }
  checkToken(route: ActivatedRouteSnapshot) {
    if (localStorage.getItem('token')) {
      // return this.checkAccess(route);
      return true;
    } else {
      this.router.navigateByUrl('');
      return false;
    }
  }

  checkAccess(next: ActivatedRouteSnapshot) {
    let perId = JSON.parse(localStorage.getItem('token')!);
    if (perId.find(({ name }: any) => name === next.data['name'])) {
      return true;
    } else {
      return false;
    }
  }
}
