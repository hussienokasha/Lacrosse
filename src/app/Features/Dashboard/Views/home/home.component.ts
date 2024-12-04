import { Component } from '@angular/core';
import { Home } from '../../../../Core/interfaces/home';

import { DialogService } from 'primeng/dynamicdialog';
import { HomeDialogComponent } from '../../components/home-dialog/home-dialog.component';
import { HomeService } from '../../../../Core/services/home.service';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-home',
  imports: [DropdownModule, ReactiveFormsModule, TranslateModule, ToastModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DialogService, MessageService],
})
export class HomeComponent {
  selectedLang = new FormControl(1);
  imgFile1!: File;
  imgFile2!: File;
  imgFile3!: File;
  videoImgFile!: File;
  VideoFile!: File;

  imgPreview1!: string;
  imgPreview2!: string;
  imgPreview3!: string;
  videoImgPreview!: string;
  VideoPreview!: string;

  homeForm!: FormGroup;
  homeContent?: Home;
  langOptions: any[] = [
    { label: 'عربي', value: 1 },
    { label: 'English', value: 2 },
  ];
  constructor(
    private homeService: HomeService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private translate:TranslateService,

    fb: FormBuilder
  ) {
    this.homeForm = fb.group({
      Title: ['', Validators.required],
      SubTitle: ['', Validators.required],
      TitlePartner: ['', Validators.required],
      TitleProgram: ['', Validators.required],
      VideoTitle: ['', Validators.required],
      Longitude: ['', Validators.required],
      Latitude: ['', Validators.required],
      imgFile1: [''],
      imgFile2: [''],
      imgFile3: [''],
      videoImageFile: [''],
      videoFile: [''],
    });
  }
  ngOnInit() {
    this.getHomeContent();
  }

  getHomeContent() {
    this.homeService.getHomeData(this.selectedLang.value!).subscribe({
      next: (data: Home) => {
        this.homeContent = data;
        this.homeForm.patchValue({
          Title: data.title,
          SubTitle: data.subTitle,
          TitlePartner: data.titlePartner,
          TitleProgram: data.titleProgram,
          VideoTitle: data.videoTitle,
          Longitude: data.longitude,
          Latitude: data.latitude,
        });
      },
    });
    this.imgPreview1 = '';
    this.imgPreview2 = '';
    this.imgPreview3 = '';
    this.videoImgPreview = '';
    this.VideoPreview = '';
  }
  HomeDialog() {
    this.dialogService.open(HomeDialogComponent, {
      header: 'Add Content To Home',
      width: '50vw',
    });
  }
  editContent() {
    const data = new FormData();
    const formValues = this.homeForm.value;
    data.append('Id', this.homeContent?.id.toString()!)
    Object.keys(formValues).forEach((k) => {
      if (
        k !== 'imgFile1' &&
        k !== 'imgFile2' &&
        k !== 'imgFile3' &&
        k !== 'videoImageFile' &&
        k !== 'videoFile'
      )
        data.append(k, formValues[k]);
    });
    if (this.imgFile1) data.append('imgFile1', this.imgFile1);
    if (this.imgFile2) data.append('imgFile2', this.imgFile2);
    if (this.imgFile3) data.append('imgFile3', this.imgFile3);
    if (this.videoImgFile) data.append('videoImageFile', this.videoImgFile);
    if (this.VideoFile) data.append('videoFile', this.VideoFile);

    this.homeService.updatedHome(data).subscribe({
      next: () => {
        this.getHomeContent();
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('Success'),
          detail: this.translate.instant('Home Content Updated Successfully'),
        });
      },
    });
  }



  onFileChange1(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imgFile1 = file;
      this.imgPreview1 = URL.createObjectURL(file);

    }
  }
  onFileChange2(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imgFile2 = file;
      this.imgPreview2 = URL.createObjectURL(file);
    }
  }
  onFileChange3(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imgFile3 = file;
      this.imgPreview3 = URL.createObjectURL(file);
    }
  }
  onFileChange4(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.videoImgFile = file;
      this.videoImgPreview = URL.createObjectURL(file);
    }
  }
  onFileChange5(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.VideoFile = file;
      this.VideoPreview = URL.createObjectURL(file);
    }
  }
  onCancel() {
    if (this.homeContent) {
      this.getHomeContent();
    }
  }
}
