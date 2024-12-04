import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { BanerComponent } from '../../Shared/components/baner/baner.component';
import { Events } from '../../Core/interfaces/events';
import { ActivatedRoute } from '@angular/router';
import { MapComponent } from '../../Shared/components/map/map.component';
import { EventsService } from '../../Core/services/events.service';
import { TimeFormatPipe } from "../../Core/utils/Pipes/time-format.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [TranslateModule, BanerComponent, MapComponent, TimeFormatPipe,CommonModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
})
export class EventDetailsComponent {
  details!: Events;
  eventId!: number;
  constructor(
    private event: EventsService,
     activeRoute: ActivatedRoute
  ) {
    this.eventId = activeRoute.snapshot.params['id'];
  }
  ngOnInit() {
    this.getDetails();
  }
  getDetails() {
    this.event.getEventDetails(this.eventId).subscribe({
      next: (data: Events) => {
        this.details = data;
      },
    });
  }
}
