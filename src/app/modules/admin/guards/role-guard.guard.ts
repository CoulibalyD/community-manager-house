import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import {AuthService} from '../../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'];
    const userRole = this.authService.getRole();

    if (userRole === requiredRole) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
