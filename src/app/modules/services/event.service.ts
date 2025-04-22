import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  //private apiUrl = 'http://localhost:9897/api/events';
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/events`);
  }

  createEvent(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/events`, formData);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/events/${id}`);
  }

  getImageUrl(id: number): string {
    return `${this.apiUrl}/events/${id}/image`;
  }

  updateEvent(id: number, formData: FormData) {
    return this.http.put(`${this.apiUrl}/events/${id}`, formData);
  }

}
