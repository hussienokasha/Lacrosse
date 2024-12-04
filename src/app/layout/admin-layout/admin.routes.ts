import { Routes } from '@angular/router';

import { HomeComponent } from '../../Features/Dashboard/Views/home/home.component';
import { EventsComponent } from '../../Features/Dashboard/Views/events/events.component';
import { AboutComponent } from '../../Features/Dashboard/Views/about/about.component';
import { MembersComponent } from '../../Features/Dashboard/Views/members/members.component';
import { VisionComponent } from '../../Features/Dashboard/Views/vision/vision.component';
import { LacrosseTypeComponent } from '../../Features/Dashboard/Views/lacrosse-type/lacrosse-type.component';
import { ContactComponent } from '../../Features/Dashboard/Views/contact/contact.component';
import { FooterComponent } from '../../Features/Dashboard/Views/footer/footer.component';
import { PartnersComponent } from '../../Features/Dashboard/Views/partners/partners.component';
import { AchievementsComponent } from '../../Features/Dashboard/Views/achievements/achievements.component';
import { ProgramsComponent } from '../../Features/Dashboard/Views/programs/programs.component';
import { QuistionsDashComponent } from '../../Features/Dashboard/Views/quistions-dash/quistions-dash.component';
import { LanguagesComponent } from '../../Features/Dashboard/Views/languages/languages.component';
import { NewsComponent } from '../../Features/Dashboard/Views/news/news.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'events', component: EventsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'members', component: MembersComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'lacrosse-type', component: LacrosseTypeComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'achievements', component: AchievementsComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'questions', component: QuistionsDashComponent },
  { path: 'langs', component: LanguagesComponent },
  { path: 'news', component: NewsComponent },
];
