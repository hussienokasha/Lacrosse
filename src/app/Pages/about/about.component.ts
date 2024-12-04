import { Component } from '@angular/core';
import { DirectorsComponent } from '../../Features/About/components/directors/directors.component';
import { TypesComponent } from '../../Features/About/components/types/types.component';
import { VisionComponent } from '../../Features/About/components/vision/vision.component';
import { AboutSectionComponent } from '../../Features/Home/components/about-section/about-section.component';
import { BanerComponent } from '../../Shared/components/baner/baner.component';
import { ContactUsComponent } from '../../Shared/components/contact-us/contact-us.component';
import { TranslateModule } from '@ngx-translate/core';
import { AboutService } from '../../Core/services/about.service';


@Component({
  selector: 'app-about',
  imports: [
    BanerComponent,
    AboutSectionComponent,
    VisionComponent,
    DirectorsComponent,
    TypesComponent,
    ContactUsComponent,
    TranslateModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
})
export class AboutComponent {
  title?: string = undefined;
  langId: number = 2;
  constructor(private aboutService: AboutService) {
    this.langId = localStorage.getItem('language')=='en'?2:1;
  }

  ngOnInit(): void {
    this.aboutService.getAboutData(this.langId).subscribe({
      next: (t: any) => {
        this.title = t.title;
      },
    });
  }
}
