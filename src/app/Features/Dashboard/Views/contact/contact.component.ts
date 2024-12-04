import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ContactInfo } from '../../../../Core/interfaces/contactInfo';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ContactService } from '../../../../Core/services/contact.service';
import { ToastModule } from 'primeng/toast';
import { ContactDialogComponent } from '../../components/contact-dialog/contact-dialog.component';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule, ToastModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers: [DialogService, MessageService],
})
export class ContactComponent {
  contactForm!: FormGroup;
  contactData?: ContactInfo;
  langOptions: any[] = [
    { label: 'عربي', value: 1 },
    { label: 'English', value: 2 },
  ];
  constructor(
    private dialogService: DialogService,
    private contact: ContactService,
    private messageService: MessageService,

    private transalte: TranslateService,

    fb: FormBuilder
  ) {
    this.contactForm = fb.group({
      langId: [1, Validators.required],
      email: ['', [Validators.required]],
      address: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.getContactData();
  }
  contactDialog() {
    const ref = this.dialogService.open(ContactDialogComponent, {
      header: this.transalte.instant('Add Contact Information'),
      width: '35vw',
    });
    ref.onClose.subscribe({
      next: (d) => {
        if (d) {
          this.messageService.add({
            severity: 'success',
            summary: this.transalte.instant('Success'),
            detail: this.transalte.instant(
              'Contact Information Added Successfully'
            ),
          });
          this.getContactData();
        }
      },
    });
  }

  onCancel() {
    if (this.contactData) {
      this.contactForm.patchValue(this.contactData);
    }
  }
  getContactData() {
    this.contact.getContactData(this.contactForm.value['langId']).subscribe({
      next: (data: ContactInfo) => {
        this.contactData = data;
        this.contactForm.patchValue(data);
      },
    });
  }
  updateContact() {
    if (this.contactForm.valid)
      this.contact
        .editContactData({
          id: this.contactData?.id,
          ...this.contactForm.value,
        })
        .subscribe({
          next: () => {
            this.getContactData();
            this.messageService.add({
              severity: 'success',
              summary: this.transalte.instant('Success'),
              detail: this.transalte.instant('Contact Information updated successfully'),
            });
          },
        });
  }
}
