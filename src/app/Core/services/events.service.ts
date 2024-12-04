import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LanguageService } from './language.service';
import { Events } from '../interfaces/events';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';

  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }

  getEvents(langId:number) {
    return this.http.get<Events[]>(`${this.BaseUrl}/Event`,{params:{langId}});
  }
  getEventDetails(eventId: number) {
    return this.http.get<Events>(`${this.BaseUrl}/Event/getById`, {
      params: { id: eventId },
    });
  }
  addEvent(data: FormData) {
    return this.http.post(`${this.BaseUrl}/Event/Create`, data);
  }
  updateEvent(data: FormData) {
    return this.http.put(`${this.BaseUrl}/Event/Update`, data);
  }
  deleteEvent(eventId:number):Observable<void>{
    return this.http.delete<void>(`${this.BaseUrl}/Event`,{params:{id:eventId}});
  }
}
