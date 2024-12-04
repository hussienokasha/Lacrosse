import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { Vision } from '../interfaces/vision';

@Injectable({
  providedIn: 'root',
})
export class VisionService {
  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';

  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }
  getVisionAndMission(langId: number) {
    return this.http.get<Vision[]>(`${this.BaseUrl}/VisionMission`, {
      params: { langId },
    });
  }
  addVision(vData:FormData){
    return this.http.post(`${this.BaseUrl}/VisionMission/Create`, vData);
  }
  editVision(vData:FormData){
    return this.http.put(`${this.BaseUrl}/VisionMission/Update`, vData);
  }
  deleteVision(visionId: number){
    return this.http.delete(`${this.BaseUrl}/VisionMission`, {params:{id:visionId}});
  }
}
