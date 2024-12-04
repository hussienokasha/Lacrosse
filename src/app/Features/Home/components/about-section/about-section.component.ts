import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { About } from '../../../../Core/interfaces/about';
import { AboutService } from '../../../../Core/services/about.service';

@Component({
  selector: 'app-about-section',
  imports: [TranslateModule],
  standalone: true,
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss',
})
export class AboutSectionComponent {
  aboutData?: About = undefined;
  langId: number=2;
  constructor(private aboutService: AboutService) {
    this.langId = localStorage.getItem('language')=='en'?2:1;
  }

  getAboutData() {
    this.aboutService.getAboutData(this.langId).subscribe({
      next: (data: About) => {
        this.aboutData = data;
      },
    });
  }
  ngOnInit(): void {
    this.getAboutData();
  }
}
