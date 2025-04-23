import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-confirm-event-dialog',
  imports: [CommonModule],
  templateUrl: './confirm-event-dialog.component.html',
})
export class ConfirmEventDialogComponent {
  @Input() show = false;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
