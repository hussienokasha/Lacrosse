import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { News } from '../interfaces/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';

  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }

  getNews(langId: number) {
    return this.http.get<News[]>(`${this.BaseUrl}/News`, {
      params: { langId },
    });
  }
  updateNews(newsData: FormData) {
    return this.http.put(`${this.BaseUrl}/News/Update`, newsData);
  }
  addNews(newsData: FormData) {
    return this.http.post(`${this.BaseUrl}/News/Create`, newsData);
  }
  deleteNews(newsId: number) {
    return this.http.delete(`${this.BaseUrl}/News`, { params: { id: newsId } });
  }
}
