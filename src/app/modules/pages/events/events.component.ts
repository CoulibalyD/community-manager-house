import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AppEvent} from '../../model/Event';
import {EventService} from '../../services/event.service';
import {ConfirmEventDialogComponent} from '../../sequeleton/confirm-event-dialog/confirm-event-dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-events',
  imports: [CommonModule, FormsModule, ConfirmEventDialogComponent],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: AppEvent[] = [];

  // selectedImage: File | null = null;
  editingEventId: number | null = null;

  newEvent: Partial<AppEvent> = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: ''
  };

  @ViewChild('eventForm') eventFormRef!: ElementRef;

  startEdit(event: AppEvent): void {
    this.editingEventId = event.id!;
    this.newEvent = {
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location
    };

    this.selectedImage = null;

    if (this.eventFormRef) {
      setTimeout(() => {
        this.eventFormRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    }

  }


  constructor(private eventService: EventService,   private toastr: ToastrService ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

 /* onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }*/


  cancelEdit(): void {
    this.editingEventId = null;
    this.resetForm();
  }

  submitForm(): void {
    const formData = new FormData();
    formData.append('title', this.newEvent.title || '');
    formData.append('description', this.newEvent.description || '');
    formData.append('date', this.newEvent.date || '');
    formData.append('time', this.newEvent.time || '');
    formData.append('location', this.newEvent.location || '');

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    if (this.editingEventId !== null) {
      this.eventService.updateEvent(this.editingEventId, formData).subscribe(() => {
        this.cancelEdit();
        this.loadEvents();
        this.toastr.success('Événement mis à jour avec succès', 'Modification');
      });
    } else {
      this.eventService.createEvent(formData).subscribe(() => {
        this.resetForm();
        this.loadEvents();
        this.toastr.success('Événement ajouté avec succès', 'Création');
      });
    }
  }


  deleteEvent(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet événement ?')) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.loadEvents();
      });
    }
  }

  getImageUrl(id: number): string {
    return this.eventService.getImageUrl(id);
  }

  resetForm(): void {
    this.newEvent = { title: '', description: '', date: '', time:'', location: '' };
    this.selectedImage = null;
  }

  selectedImage: File | null = null;
  imagePreview: string | null = null;
  isDragging = false;

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      this.selectedImage = file;

      // 👁️ Crée un aperçu (URL temporaire de l'image)
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.selectedImage = file;

      // Aperçu immédiat
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Astuce : pour garder la même logique que le (change)
      const fakeEvent = { target: { files: [file] } } as unknown as Event;
      this.onImageSelected(fakeEvent);
    }
  }

  showConfirmDialog = false;
  eventToDeleteId: number | null = null;

  askDelete(id: number) {
    this.eventToDeleteId = id;
    this.showConfirmDialog = true;
  }

  confirmDelete() {
    if (this.eventToDeleteId !== null) {
      this.eventService.deleteEvent(this.eventToDeleteId).subscribe(() => {
        this.loadEvents();
        this.toastr.success('Événement supprimé avec succès', 'Suppression');
        this.showConfirmDialog = false;
        this.eventToDeleteId = null;
      });
    }
  }


}


