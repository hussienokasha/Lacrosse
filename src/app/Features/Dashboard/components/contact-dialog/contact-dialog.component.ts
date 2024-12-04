import { Component } from '@angular/core';
import { ContactService } from '../../../../Core/services/contact.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,SelectButtonModule],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss',
})
export class ContactDialogComponent {
  langOptions: any[] = [
    { label: 'العربية', value: 1 },
    { label: 'English', value: 2 },
  ];
  contactForm!: FormGroup;
  constructor(
    private contact: ContactService,
    public ref:DynamicDialogRef,

    fb: FormBuilder
  ) {
    this.contactForm = fb.group({
      langId: [1, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }
  addContact(){
    this.contact.addContactData(this.contactForm.value).subscribe({
      next: () => {
        this.ref.close(true);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
