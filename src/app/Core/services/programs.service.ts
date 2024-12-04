import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { Program } from '../interfaces/program';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';

  lang!: number;
  constructor(private http: HttpClient, langService: LanguageService) {
    this.lang = langService.lang() == 'en' ? 2 : 1;
  }

  getProgramsData(langId: number) {
    return this.http.get<Program[]>(`${this.BaseUrl}/Program`, {
      params: { langId },
    });
  }
  addProgram(programData: FormData) {
    return this.http.post(`${this.BaseUrl}/Program/Create`, programData);
  }
  updateProgram(programData: FormData) {
    return this.http.put(`${this.BaseUrl}/Program/Update`, programData);
  }
  deleteProgram(programId: number) {
    return this.http.delete(`${this.BaseUrl}/Program`, {
      params: { id: programId },
    });
  }
  getProgramDetails(programId: number) {
    return this.http.get<Program>(`${this.BaseUrl}/Program/getById`, {
      params: { id: programId },
    });
  }
}
