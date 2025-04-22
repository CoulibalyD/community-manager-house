import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth-service.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    showPassword: false,
  };

  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.auth.register(this.form).subscribe({
      next: () => {
        this.message = 'Inscription réussie ! Vous pouvez vous connecter.';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.message = 'Erreur lors de l’inscription.';
        console.error(err);
      }
    });
  }

  togglePasswordVisibility() {
    this.form.showPassword = !this.form.showPassword;
  }
}
