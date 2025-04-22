import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  increment(type: string) {
    return this.http.post(`${this.apiUrl}/stats/${type}/increment`, {});
  }

  getAllStats() {
    return this.http.get<any[]>(`${this.apiUrl}/stats`);
  }


}
