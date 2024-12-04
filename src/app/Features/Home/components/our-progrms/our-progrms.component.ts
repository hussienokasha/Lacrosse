import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Home } from '../../../../Core/interfaces/home';

import { Program } from '../../../../Core/interfaces/program';
import { HomeService } from '../../../../Core/services/home.service';
import { ProgramsService } from '../../../../Core/services/programs.service';

@Component({
  selector: 'app-our-progrms',
  imports: [TranslateModule],
  standalone: true,
  templateUrl: './our-progrms.component.html',
  styleUrl: './our-progrms.component.scss',
})
export class OurProgrmsComponent {
  homeContent?: Home = undefined;
  programs?: Program[] = [];
  langId: number=2;
  constructor(
    private homeService: HomeService,
    private programService: ProgramsService
  ) {
    this.langId = localStorage.getItem('language')=='en'?2:1;
  }
  ngOnInit(): void {
    this.getHomeData();
    this.getPrograms();
  }
  getHomeData() {
    this.homeService.getHomeData(this.langId).subscribe({
      next: (data: Home) => {
        this.homeContent = data;
      },
    });
  }
  getPrograms() {
    this.programService.getProgramsData(this.langId).subscribe({
      next: (p: Program[]) => {
        this.programs = p;
      },
    });
  }
}
