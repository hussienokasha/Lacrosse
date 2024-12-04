import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../interfaces/language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  lang = signal(localStorage.getItem('language') || 'en');
  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';
  constructor(private translate: TranslateService, private router: Router,private http:HttpClient) {
    const pathArray = window.location.pathname.split('/');
    if (pathArray.includes('en') || pathArray.includes('ar')) {
      this.lang.set(pathArray.includes('ar') ? 'ar' : 'en');
    } else {
      this.lang.set('en');
    }

    localStorage.setItem('language', this.lang());
    this.translate.use(this.lang());
    this.setDirection(this.lang());
  }

  toggleLanguage() {
    const newLang = this.lang() === 'en' ? 'ar' : 'en';
    this.lang.set(newLang);
    localStorage.setItem('language', newLang);


    const pathArray = window.location.pathname.split('/');
    pathArray[1] = newLang;
    const newUrl = pathArray.join('/');

    this.router.navigateByUrl(newUrl).then(() => {
      window.location.reload();
    });
  }

  private setDirection(lang: string) {
    const dir = lang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', dir);
  }

  getAllLangs(){
    return this.http.get<Language[]>(`${this.BaseUrl}/Lang`);
  }
}
