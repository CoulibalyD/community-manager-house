import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  sendContactMessage(payload: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/contact`, payload);
  }
}
