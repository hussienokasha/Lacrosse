import { ChangeDetectionStrategy, Component } from '@angular/core';

import { About } from '../../../../Core/interfaces/about';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AboutService } from '../../../../Core/services/about.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule,DropdownModule,TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  langOptions: any[] = [
    { label: 'عربي', value: 1 },
    { label: 'English', value: 2 },
  ];
  aboutForm!: FormGroup;
  currentImg?: string;
  selectedImgUrl?: string;
  selectedImg?: File;
  originalData!: About;
  selectedLang = new FormControl(1);
  constructor(
    private about: AboutService,
    fb: FormBuilder,
    private messageService: MessageService,
    private transalte:TranslateService
  ) {
    this.aboutForm = fb.group({
      Title: ['', Validators.required],
      Description1: ['', Validators.required],
      Description2: ['', Validators.required],
      Description3: ['', Validators.required],
      file: [''],
    });
  }

  ngOnInit(): void {
    this.getAboutContent();
  }

  getAboutContent() {
    this.about.getAboutData(this.selectedLang.value!).subscribe({
      next: (data: About) => {
        this.originalData = data;
        this.currentImg = data.img;
        this.aboutForm.patchValue({
          Title: data.title,
          Description1: data.description1,
          Description2: data.description2,
          Description3: data.description3,
        });
      },
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImg = file;
      this.currentImg = undefined;
      this.selectedImgUrl = URL.createObjectURL(file);
    }
  }

  onCancel() {
    if (this.originalData) {
      this.aboutForm.patchValue({
        Title: this.originalData.title,
        Description1: this.originalData.description1,
        Description2: this.originalData.description2,
        Description3: this.originalData.description3,
      });
      this.selectedImgUrl = undefined;
      this.currentImg = this.originalData.img;
    }
  }
  updateAbout() {
    if (this.aboutForm.valid) {
      const formData = new FormData();
      const formValue = this.aboutForm.value;
      formData.append('Id', this.originalData.id.toString());
      Object.keys(formValue).forEach((key) => {
        if (key !== 'file') {
          formData.append(key, formValue[key]);
        }
      });
      if (this.selectedImg) {
        formData.append('file', this.selectedImg);
      }

      this.about.updateAboutData(formData).subscribe({
        next: () => {
          this.getAboutContent();

          this.messageService.add({
            severity: 'success',
            summary: this.transalte.instant('Success'),
            detail:  this.transalte.instant('About data updated successfully') ,
          });
        },
      });
    }
  }
}
