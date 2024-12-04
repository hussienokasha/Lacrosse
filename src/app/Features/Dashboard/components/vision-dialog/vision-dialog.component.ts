import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VisionService } from '../../../../Core/services/vision.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-vision-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,SelectButtonModule],
  templateUrl: './vision-dialog.component.html',
  styleUrl: './vision-dialog.component.scss',
})
export class VisionDialogComponent {
  imgFile!: File;
  imgPreview!: string;

  visionForm!: FormGroup;
  langOptions: any[] = [
    { label: 'العربية', value: 1 },
    { label: 'English', value: 2 },
  ];
  constructor(
    fb: FormBuilder,
    private visionService: VisionService,
    public ref: DynamicDialogRef
  ) {
    this.visionForm = fb.group({
      LangId: [1, Validators.required],
      Header: ['', Validators.required],
      Content: ['', Validators.required],
      file: ['', Validators.required],
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
  addVision() {
    const data = new FormData();
    const formValues = this.visionForm.value;
    Object.keys(formValues).forEach((k) => {
      if (k !== 'file') {
        data.append(k, formValues[k]);
      }
    });
    if (this.imgFile) {
      data.append('file', this.imgFile);
    }
    if (this.visionForm.value) {
      this.visionService.addVision(data).subscribe({
        next: () => {
          this.ref.close(true);
        },
      });
    }
  }
}
