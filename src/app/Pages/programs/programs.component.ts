import { Component } from '@angular/core';
import { KnowMoreComponent } from '../../Features/Home/components/know-more/know-more.component';
import { OurProgrmsComponent } from '../../Features/Home/components/our-progrms/our-progrms.component';
import { BanerComponent } from '../../Shared/components/baner/baner.component';
import { ContactUsComponent } from '../../Shared/components/contact-us/contact-us.component';


@Component({
  selector: 'app-programs',
  standalone:true,
  imports: [BanerComponent, OurProgrmsComponent, KnowMoreComponent, ContactUsComponent],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss'
})
export class ProgramsComponent {

}
