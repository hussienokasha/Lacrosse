import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Home } from '../../../../Core/interfaces/home';

import { Partner } from '../../../../Core/interfaces/partner';
import { HomeService } from '../../../../Core/services/home.service';
import { PartnersService } from '../../../../Core/services/partners.service';

@Component({
  selector: 'app-partner',
  imports: [TranslateModule],
  standalone: true,
  templateUrl: './partner.component.html',
  styleUrl: './partner.component.scss',
})
export class PartnerComponent {
  homeContent?: Home = undefined;
  partners?: Partner[] = [];
  langId: number=2;
  constructor(
    private homeService: HomeService,
    private partnerService: PartnersService
  ) {
    this.langId = localStorage.getItem('language')=='en'?2:1;
  }
  ngOnInit(): void {
    this.getHomeData();
    this.getPartners();
  }
  getHomeData() {
    this.homeService.getHomeData(this.langId).subscribe({
      next: (data: Home) => {
        this.homeContent = data;
      },
    });
  }
  getPartners() {
    this.partnerService.getAllParterners().subscribe({
      next: (p: Partner[]) => {
        this.partners = p;
      },
    });
  }
}
