import { Component } from '@angular/core';
import { AboutSectionComponent } from '../../Features/Home/components/about-section/about-section.component';
import { AchievementComponent } from '../../Features/Home/components/achievement/achievement.component';
import { KnowMoreComponent } from '../../Features/Home/components/know-more/know-more.component';
import { LandingComponent } from '../../Features/Home/components/landing/landing.component';
import { MapComponent } from '../../Shared/components/map/map.component';
import { OurProgrmsComponent } from '../../Features/Home/components/our-progrms/our-progrms.component';
import { PartnerComponent } from '../../Features/Home/components/partner/partner.component';
import { QuestionsComponent } from '../../Features/Home/components/questions/questions.component';
import { ContactUsComponent } from '../../Shared/components/contact-us/contact-us.component';

import { Home } from '../../Core/interfaces/home';
import { HomeService } from '../../Core/services/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LandingComponent,
    AboutSectionComponent,
    KnowMoreComponent,
    OurProgrmsComponent,
    PartnerComponent,
    AchievementComponent,
    QuestionsComponent,
    MapComponent,
    ContactUsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  homeContent?: Home;
  langId: number=2;
  constructor(private home: HomeService) {
    this.langId = localStorage.getItem('language')=='en'?2:1;
  }

  ngOnInit(): void {
    this.home.getHomeData(this.langId).subscribe((data) => {
      this.homeContent = data;
    });
  }
}
