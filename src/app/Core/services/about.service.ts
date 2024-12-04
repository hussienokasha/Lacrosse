import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { About } from '../interfaces/about';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';
  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }

  getAboutData(langId:number) {
    return this.http.get<About>(`${this.BaseUrl}/About`, {
      params: { langId },
    });
  }


  updateAboutData(data: FormData) {
    return this.http.put<About>(`${this.BaseUrl}/About/Update`, data);
  }
}
