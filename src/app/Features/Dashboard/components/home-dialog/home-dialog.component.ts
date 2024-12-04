import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../../../../Core/services/home.service';

@Component({
  selector: 'app-home-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home-dialog.component.html',
  styleUrl: './home-dialog.component.scss',
})
export class HomeDialogComponent {
  homeForm!: FormGroup;
  selectedImg1!: File;
  selectedImg2!: File;
  selectedImg3!: File;
  selectedVideo!: File;
  constructor(private homeService: HomeService, fb: FormBuilder) {
    this.homeForm = fb.group({
      // LangId:[''],
      Title: [''],
      SubTitle: [''],
      TitlePartner: [''],
      TitleProgram: [''],
      VideoTitle: [''],
      Longitude: [''],
      latitude: [''],
      imgFile1: [''],
      imgFile2: [''],
      imgFile3: [''],
      videoFile: [''],
    });
  }
  AddContent() {
    let data = new FormData();
    data.append('Title', this.homeForm.value['Title']);
    data.append('SubTitle', this.homeForm.value['SubTitle']);
    data.append('TitlePartner', this.homeForm.value['TitlePartner']);
    data.append('TitleProgram', this.homeForm.value['TitleProgram']);
    data.append('Longitude', this.homeForm.value['Longitude']);
    data.append('latitude', this.homeForm.value['latitude']);
    data.append('imgFile1', this.selectedImg1, this.selectedImg1?.name);
    data.append('imgFile2', this.selectedImg2, this.selectedImg2?.name);
    data.append('imgFile3', this.selectedImg3, this.selectedImg3?.name);
    data.append('videoFile', this.selectedVideo, this.selectedVideo?.name);
  }

  onImg1Selected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImg1 = input.files[0];
      console.log('Selected file:', this.selectedImg1);
    }
  }
  onImg2Selected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImg2 = input.files[0];
      console.log('Selected file:', this.selectedImg2);
    }
  }
  onImg3Selected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImg3 = input.files[0];
      console.log('Selected file:', this.selectedImg3);
    }
  }
  onVideoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedVideo = input.files[0];
      console.log('Selected file:', this.selectedVideo);
    }
  }
}
