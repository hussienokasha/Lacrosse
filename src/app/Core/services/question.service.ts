import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Question } from '../interfaces/question';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';

  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }

  getQAndA(langId: number) {
    return this.http.get<Question[]>(`${this.BaseUrl}/Question`, {
      params: { langId },
    });
  }
  updateQandA(QuesData: Question) {
    return this.http.put(`${this.BaseUrl}/Question/Update`, QuesData);
  }
  addQuestion(QuesData: Question) {
    return this.http.post(`${this.BaseUrl}/Question/Create`, QuesData);
  }
  deleteQuestion(quesId: number) {
    return this.http.delete(`${this.BaseUrl}/Question`, {
      params: { id: quesId },
    });
  }
}
