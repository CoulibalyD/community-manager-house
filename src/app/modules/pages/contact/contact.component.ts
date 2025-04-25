import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import {AuthService} from '../../services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, RecaptchaModule, RecaptchaFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  form = {
    name: '',
    email: '',
    subject: '',
    message: '',
  //  recaptcha: ''
  };

  success = false;
  tried = false;
  loading = false;

  constructor(
    private contactService: ContactService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const user = this.auth.currentUserValue;
    if (user) {
      this.form.name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
      this.form.email = user.email;
    }
  }


  // onCaptchaResolved(token: string | null): void {
  //   this.form.recaptcha = token || '';
  // }

  submitForm(): void {
    this.tried = true;

   // if (!this.form.recaptcha) return;

    this.loading = true;
    this.contactService.sendContactMessage(this.form).subscribe({
      next: () => {
        this.success = true;
        this.form = {
          name: this.form.name, // 👈 on garde le nom/email préremplis
          email: this.form.email,
          subject: '',
          message: '',
         // recaptcha: ''
        };
        this.toastr.success('Votre message a été envoyé avec succès ✅', 'Succès');
        this.loading = false;
      },
      error: () => {
        this.toastr.error("Une erreur est survenue. Veuillez réessayer.", 'Échec');
        this.loading = false;
      }
    });
  }
}
