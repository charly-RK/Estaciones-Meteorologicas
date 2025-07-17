// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      return this.router.parseUrl('/login');
    }

    const user = JSON.parse(userData);
    const expectedRoles: string[] = route.data['roles'];

    if (!expectedRoles.includes(user.rol)) {
      return this.router.parseUrl('/inicio'); 
    }

    return true;
  }
}
