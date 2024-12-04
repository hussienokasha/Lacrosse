import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
import { LanguageService } from '../../Core/services/language.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../Features/Auth/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    AccordionModule,
    TranslateModule,
    MenuModule,
  ],
  standalone: true,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  isSidebarCollapsed = false;
  currentLang: string;
  adminInfo:any = JSON.parse(localStorage.getItem('adminData')!)
items: MenuItem[]|undefined;
  constructor(public languageService: LanguageService,private auth:AuthService) {
    this.currentLang = this.languageService.lang();
    this.items = [
      {

          items: [
              {
                  label: 'Logout',
                  icon: 'fa-solid fa-arrow-right-from-bracket',
                  command:()=>this.logout()
              },

          ]
      }
  ];
  }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  changeLanguage() {
    this.languageService.toggleLanguage();
  }
  logout(){
this.auth.logout();

  }
}
