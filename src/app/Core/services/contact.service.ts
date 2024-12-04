import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { ContactInfo } from '../interfaces/contactInfo';
import { ContactDetails } from '../interfaces/contact-details';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';

  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }
  getContactData(langId: number) {
    return this.http.get<ContactInfo>(`${this.BaseUrl}/ContactInfo`, {
      params: { langId },
    });
  }
  addContactData(con: ContactInfo) {
    return this.http.post(`${this.BaseUrl}/ContactInfo/Create`, con);
  }
  editContactData(con: ContactInfo) {
    return this.http.put(`${this.BaseUrl}/ContactInfo/Update`, con);
  }

  getContactDetails(langId:number){
    return this.http.get<ContactDetails>(`${this.BaseUrl}/Details`,{params:{langId}});
  }
}
