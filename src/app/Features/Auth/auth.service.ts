import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BaseUrl: string = 'https://testapi.toq.sa/LacrosseApi/api';

  constructor(private http: HttpClient,private router:Router) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.BaseUrl}/Account/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem(
          'adminData',
          JSON.stringify(res)
        );
      })
    );
  }

  logout() {

    localStorage.removeItem('adminData');
    this.router.navigate(['/en','login']);

  }
}
