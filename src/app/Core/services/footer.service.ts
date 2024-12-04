import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { Footer } from '../interfaces/footer';


@Injectable({
  providedIn: 'root'
})
export class FooterService {

  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';

  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }

  getFooterData(langId: number) {
    return this.http.get<Footer>(`${this.BaseUrl}/Footer`, {
      params: { langId },
    });
  }
  updateFooter(footerData:FormData){
    return this.http.put(`${this.BaseUrl}/Footer/Update`, footerData);
  }

  addFooterData(footerData:FormData){
    return this.http.post(`${this.BaseUrl}/Footer/Create`, footerData);
  }
}
