import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Events } from '../../../../Core/interfaces/events';
import { RouterLink } from '@angular/router';
import { EventsService } from '../../../../Core/services/events.service';
import { LanguageService } from '../../../../Core/services/language.service';

@Component({
  selector: 'app-upcoming',
  imports: [TranslateModule, RouterLink],
  standalone: true,
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.scss',
})
export class UpcomingComponent {
  events?: Events[];
  langId:number=2
  currentLang: string;
  constructor(private event: EventsService,private languageService:LanguageService) {
    this.langId = localStorage.getItem('language')=='en'?2:1;
    this.currentLang = this.languageService.lang()
  }

  ngOnInit() {
    this.getEvents();
  }
  getEvents() {
    this.event.getEvents(this.langId).subscribe({
      next: (data: Events[]) => {
        this.events = data;
      },
    });
  }
}
