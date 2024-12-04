import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Achievement } from '../interfaces/achievement';
import { LanguageService } from './language.service';


@Injectable({
  providedIn: 'root',
})
export class AchievementService {
  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';

  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }


  getAchievements(langId:number) {
    return this.http.get<Achievement>(`${this.BaseUrl}/Achievement`,{params:{langId}});
  }
  updateAchievement(data:Achievement) {
    return this.http.put(`${this.BaseUrl}/Achievement/Update`, data);
  }
}
