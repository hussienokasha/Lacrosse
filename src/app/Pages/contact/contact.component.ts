import { Component } from '@angular/core';
import { ContactUsComponent } from '../../Shared/components/contact-us/contact-us.component';
import { BanerComponent } from '../../Shared/components/baner/baner.component';
import { TranslateModule } from '@ngx-translate/core';
import { ContactService } from '../../Core/services/contact.service';
import { ContactInfo } from '../../Core/interfaces/contactInfo';


@Component({
  selector: 'app-contact',
  standalone:true,
  imports: [BanerComponent, ContactUsComponent,TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactData?: ContactInfo;
  langId: number=2;
  constructor(private contactInfo:ContactService){
    this.langId = localStorage.getItem('language')=='en'?2:1;
  }

  ngOnInit(): void {
    this.getContactInfo();
  }
  getContactInfo(){
    this.contactInfo.getContactData(this.langId).subscribe({
      next: (data: ContactInfo) => {
        this.contactData = data;
      }
    })
  }

}
