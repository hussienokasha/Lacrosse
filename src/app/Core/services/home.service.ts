import { HttpClient } from '@angular/common/http';
import { effect, Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { Home } from '../interfaces/home';


@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';

  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }



  getHomeData(langId:number) {
    return this.http.get<Home>(`${this.BaseUrl}/Home`,{params:{langId}});
  }

  addContent(content: FormData) {
    this.http.post(`${this.BaseUrl}/Home/Create`, content);
  }

  updatedHome(content: FormData){
    return this.http.put(`${this.BaseUrl}/Home/Update`, content);
  }
}
