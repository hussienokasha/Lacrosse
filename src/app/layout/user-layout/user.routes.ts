import { Routes } from '@angular/router';
import { HomeComponent } from '../../Pages/home/home.component';
import { AboutComponent } from '../../Pages/about/about.component';
import { ContactComponent } from '../../Pages/contact/contact.component';

import { EventsComponent } from '../../Pages/events/events.component';
import { ProgramsComponent } from '../../Pages/programs/programs.component';
import { EventDetailsComponent } from '../../Pages/event-details/event-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'programs',
    component: ProgramsComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'events/:id',
    component: EventDetailsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },

];
