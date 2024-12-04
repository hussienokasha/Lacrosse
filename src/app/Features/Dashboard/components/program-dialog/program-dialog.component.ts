import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProgramsService } from '../../../../Core/services/programs.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-program-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, SelectButtonModule],
  templateUrl: './program-dialog.component.html',
  styleUrl: './program-dialog.component.scss',
})
export class ProgramDialogComponent {
  programForm!: FormGroup;
  imgFile!: File;
  imgPreview!: string;
  hasAdded: boolean = false;
  langOptions: any[] = [
    { label: 'عربي', value: 1 },
    { label: ' En', value: 2 },
  ];
  constructor(
    fb: FormBuilder,
    private program: ProgramsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.programForm = fb.group({
      LangId: [1, Validators.required],
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      file: ['', Validators.required],
    });
  }

  addProgram() {
    const data = new FormData();
    const formValues = this.programForm.value;
    data.append('LangId', formValues.LangId.toString());
    data.append('Name', formValues.Name);
    data.append('Description', formValues.Description);
    data.append('file', this.imgFile);

    this.program.addProgram(data).subscribe({
      next:()=>{

        this.ref.close(true);
      }
    })
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
