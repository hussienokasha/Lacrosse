import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LanguageService } from './language.service';
import { Partner } from '../interfaces/partner';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  public BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';
  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }

  getAllParterners() {
    return this.http.get<Partner[]>(`${this.BaseUrl}/Partner`);
  }
  addPertner(partData: FormData) {
    return this.http.post(`${this.BaseUrl}/Partner/Create`, partData);
  }
  updatePartner(partData: FormData) {
    return this.http.put(`${this.BaseUrl}/Partner/Update`, partData);
  }
  deletePartner(partnerId: number) {
    return this.http.delete(`${this.BaseUrl}/Partner`, {
      params: { id: partnerId },
    });
  }
  getPartnerDetails(partnerId: number) {
    return this.http.get<Partner>(`${this.BaseUrl}/Partner/getById`, {
      params: { id: partnerId },
    });
  }
}
