import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Home } from '../../../../Core/interfaces/home';

import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { HomeService } from '../../../../Core/services/home.service';

@Component({
  selector: 'app-know-more',
  imports: [TranslateModule, AnimateOnScrollModule],
  standalone: true,
  templateUrl: './know-more.component.html',
  styleUrl: './know-more.component.scss',
})
export class KnowMoreComponent {
  isPlay: boolean = false;
  showPlaceholder = true;
  homeContent?: Home;
  langId: number = 2;
  constructor(private homeService: HomeService) {
    this.langId = localStorage.getItem('language') == 'en' ? 2 : 1;
  }
  ngOnInit(): void {
    this.homeService.getHomeData(this.langId).subscribe({
      next: (data: Home) => {
        this.homeContent = data;
      },
    });
  }
  playVideo(videoElement: HTMLVideoElement): void {
    this.showPlaceholder = false;
    videoElement.play();
  }
  pauseVideo(videoElement: HTMLVideoElement): void {
    if (videoElement.paused) {
      videoElement.play();
      this.isPlay = true;
      this.showPlaceholder = false;
    } else {
      videoElement.pause();
      this.isPlay = false;
    }
  }
  

}
