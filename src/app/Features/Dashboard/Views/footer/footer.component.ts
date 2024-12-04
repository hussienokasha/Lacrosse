import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Footer } from '../../../../Core/interfaces/footer';
import { FooterService } from '../../../../Core/services/footer.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { FooterDialogComponent } from '../../components/footer-dialog/footer-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ToastModule,TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  providers: [MessageService, DialogService],
})
export class FooterComponent {
  footerForm!: FormGroup;
  footerData?: Footer;
  langOptions: any[] = [
    { label: 'عربي', value: 1 },
    { label: 'English', value: 2 },
  ];
  imgFile!: File;
  imgPreview!: string | undefined;
  constructor(
    fb: FormBuilder,
    private footerService: FooterService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private translate:TranslateService
  ) {
    this.footerForm = fb.group({
      langId: [1, Validators.required],
      title: ['', Validators.required],
      linkedInLink: ['', Validators.required],
      instagramLink: ['', Validators.required],
      twitterLink: ['', Validators.required],
      logo: [''],
    });
  }

  ngOnInit() {
    this.getFooterData();
  }

  onCancel() {
    if (this.footerData) {
      this.footerForm.patchValue(this.footerData);
      this.imgPreview = undefined;
    }
  }
  getFooterData() {
    this.footerService
      .getFooterData(this.footerForm.value['langId']!)
      .subscribe({
        next: (data: Footer) => {
          this.footerData = data;
          this.footerForm.patchValue(data);
        },
      });
  }

  updateFooter() {
    const data = new FormData();
    const form = this.footerForm.value;
    data.append('Id', this.footerData?.id.toString()!);
    data.append('Title', form['title']);
    data.append('LinkedInLink', form['linkedInLink']);
    data.append('InstagramLink', form['instagramLink']);
    data.append('TwitterLink', form['twitterLink']);

    if (this.imgFile) data.append('file', this.imgFile);

    if (this.footerForm.valid)
      this.footerService.updateFooter(data).subscribe({
        next: () => {
          this.getFooterData();
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Footer Updated Successfully',
            life: 3000,
          });
        },
      });
  }

  footerDialog() {
    const ref = this.dialogService.open(FooterDialogComponent, {
      header: 'Add Footer Data',
    });
    ref.onClose.subscribe({
      next: (d: boolean) => {
        if (d) {
          this.getFooterData();
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('Success'),
            detail: this.translate.instant('Footer Data Added Successfully'),
            life: 3000,
          });
        }
      },
    });
  }
  onImgSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imgFile = file;
      this.imgPreview = URL.createObjectURL(file);
    }
  }
}
