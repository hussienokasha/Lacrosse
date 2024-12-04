import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../Core/services/language.service';
import { SidebarModule } from 'primeng/sidebar';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule,SidebarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  currentLang!:string;
  constructor(public languageService: LanguageService) {
    this.currentLang = this.languageService.lang()
  }
  sidebarVisible: boolean = false;
  dir:string =document.documentElement.getAttribute('dir') || 'ltr';
  changeLanguage() {
    this.languageService.toggleLanguage();
  }
}
