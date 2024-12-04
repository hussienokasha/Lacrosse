import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { LacrosseTypeService } from '../../../../Core/services/lacrosse-type.service';

@Component({
  selector: 'app-lacrosse-type-dialog',
  standalone: true,
  imports: [SelectButtonModule, ReactiveFormsModule],
  templateUrl: './lacrosse-type-dialog.component.html',
  styleUrl: './lacrosse-type-dialog.component.scss',
})
export class LacrosseTypeDialogComponent {
  imgPreview!: string;
  imgFile!: File;
  typeForm!: FormGroup;
  langOptions: any[] = [
    { label: 'العربية', value: 1 },
    { label: 'English', value: 2 },
  ];


  constructor(
    public dialofRef: DynamicDialogRef,
    fb: FormBuilder,
    private typeService: LacrosseTypeService
  ) {
    this.typeForm = fb.group({
      LangId: [1, Validators.required],
      Name: ['', Validators.required],
      file: ['',  Validators.required],
      Formation: ['', Validators.required],
      preparation: ['', Validators.required],
      Equipment: ['', Validators.required],
      Contact: ['', Validators.required],
      OlympicPresence: ['', Validators.required],
      Popularity: ['', Validators.required],
    });
  }
  ImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imgFile = file;
      this.imgPreview = URL.createObjectURL(file);
    }
  }


  addType() {
    const data = new FormData();
    const formValues = this.typeForm.value;

    Object.keys(formValues).forEach((key) => {
      if (key !== 'file') data.append(key, formValues[key]);
    });
    if (this.imgFile) {
      data.append('file', this.imgFile);
    }

    if (this.typeForm.valid) {
      this.typeService.addType(data).subscribe({
        next: () => {
          this.dialofRef.close(true);
        },
      });
    }
  }

}
