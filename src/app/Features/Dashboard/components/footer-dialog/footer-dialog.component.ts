import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FooterService } from '../../../../Core/services/footer.service';

@Component({
  selector: 'app-footer-dialog',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule],
  templateUrl: './footer-dialog.component.html',
  styleUrl: './footer-dialog.component.scss',
})
export class FooterDialogComponent {
  imgFile!: File;
  imgPreview!: string;

  footerForm!: FormGroup;
  langOptions: any[] = [
    { label: 'عربي', value: 1 },
    { label: ' En', value: 2 },
  ];
  constructor(
    fb: FormBuilder,
    public ref: DynamicDialogRef,
    private footerServive: FooterService
  ) {
    this.footerForm = fb.group({
      LangId: [1, Validators.required],
      Title: ['', Validators.required],
      LinkedInLink: ['', Validators.required],
      InstagramLink: ['', Validators.required],
      TwitterLink: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  addFooterData() {
    const data = new FormData();
    const formValues = this.footerForm.value;
    Object.keys(formValues).forEach((k) => {
      if (k !== 'file') data.append(k, formValues[k]);
    });
    if (this.imgFile) data.append('file', this.imgFile);
    if (this.footerForm.valid)
      this.footerServive.addFooterData(data).subscribe({
        next: () => this.ref.close(true),
      });
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imgFile = file;
      this.imgPreview = URL.createObjectURL(file);
    }
  }
}
