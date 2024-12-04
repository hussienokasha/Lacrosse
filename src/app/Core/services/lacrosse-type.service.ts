import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { LacrosseType } from '../interfaces/lacrose-type';

@Injectable({
  providedIn: 'root'
})
export class LacrosseTypeService {


  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';

  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }

  getLacrosseTypes(langId: number) {
    return this.http.get<LacrosseType[]>(`${this.BaseUrl}/LacrosseType`, {
      params: { langId },
    });
  }

  addType(typeData:FormData){
    return this.http.post(`${this.BaseUrl}/LacrosseType/Create`, typeData);
  }
  editType(typeData:FormData){
    return this.http.put(`${this.BaseUrl}/LacrosseType/Update`, typeData);
  }
  deleteType(typeId: number){
    return this.http.delete(`${this.BaseUrl}/LacrosseType`, {params:{id:typeId}});
  }
}
