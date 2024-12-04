import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Home } from '../../../../Core/interfaces/home';

import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../../../Core/services/home.service';

@Component({
  selector: 'app-landing',
  imports: [TranslateModule, GalleriaModule],
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  homeContent?: Home = undefined;
  images?: any[] = [];
  langId: number=2;
  constructor(private homeService: HomeService) {
    this.langId = localStorage.getItem('language')=='en'?2:1;
  }
  ngOnInit(): void {
    this.homeService.getHomeData(this.langId).subscribe({
      next: (data: Home) => {
        this.homeContent = data;
        this.images = [
          { img: data.img1 },
          { img: data.img2 },
          { img: data.img3 },
        ];
      },
    });
  }
}
