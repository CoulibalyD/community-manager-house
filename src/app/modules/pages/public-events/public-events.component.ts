import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-public-events',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './public-events.component.html',
  styleUrl: './public-events.component.css'
})
export class PublicEventsComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  getImageUrl(id: number): string {
    return this.eventService.getImageUrl(id);
  }
}
