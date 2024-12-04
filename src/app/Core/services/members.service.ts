import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../interfaces/member';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';

  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }

  getMembers(langId: number) {
    return this.http.get<Member[]>(`${this.BaseUrl}/Member`, {
      params: { langId },
    });
  }
  addMember(memberData: FormData) {
    return this.http.post(`${this.BaseUrl}/Member/Create`, memberData);
  }
  updateMember(memberData: FormData) {
    return this.http.put(`${this.BaseUrl}/Member/Update`, memberData);
  }
  deleteMember(memberId: number) {
    return this.http.delete(`${this.BaseUrl}/Member`, {
      params: { id: memberId },
    });
  }
}
