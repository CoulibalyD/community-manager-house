import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule } from '@angular/router';
import {AuthService} from '../../../services/auth-service.service';
import {Observable} from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;
  user$: Observable<any>; // type LoginResponse si tu veux le typer

  constructor(public auth: AuthService) {
    this.user$ = this.auth.currentUser$;
  }  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.auth.logout();
  }
}
