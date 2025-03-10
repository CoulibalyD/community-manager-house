import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';
import {RouterLink} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-nos-services',
  imports: [CommonModule, RouterLink],
  templateUrl: './nos-services.component.html',
  styleUrls: ['./nos-services.component.css'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.8s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class NosServicesComponent {}
