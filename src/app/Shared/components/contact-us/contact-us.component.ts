import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ContactService } from '../../../Core/services/contact.service';
import { ContactDetails } from '../../../Core/interfaces/contact-details';

@Component({
  selector: 'app-contact-us',
  standalone:true,
  imports: [TranslateModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  contactData?: ContactDetails;
  langId: number=2;
  constructor(private contactDetails:ContactService){
    this.langId = localStorage.getItem('language')=='en'?2:1;
  }

  ngOnInit(): void {
    this.getContactInfo();
  }
  getContactInfo(){
    this.contactDetails.getContactDetails(this.langId).subscribe({
      next: (data: ContactDetails) => {
        this.contactData = data;
      }
    })
  }
}
