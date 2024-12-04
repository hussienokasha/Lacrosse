import { Component } from '@angular/core';
import { UpcomingComponent } from '../../Features/Events/components/upcoming/upcoming.component';
import { OurProgrmsComponent } from '../../Features/Home/components/our-progrms/our-progrms.component';
import { BanerComponent } from '../../Shared/components/baner/baner.component';
import { ContactUsComponent } from '../../Shared/components/contact-us/contact-us.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-events',
  imports: [BanerComponent, ContactUsComponent, OurProgrmsComponent, UpcomingComponent,TranslateModule],
  standalone:true,
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

}
