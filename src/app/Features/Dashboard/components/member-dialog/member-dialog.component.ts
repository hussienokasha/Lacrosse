import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MembersService } from '../../../../Core/services/members.service';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-member-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,SelectButtonModule],
  templateUrl: './member-dialog.component.html',
  styleUrl: './member-dialog.component.scss',
})
export class MemberDialogComponent {
  selectedImg!: File;
  imagePreview: string | null = null;
  langOptions: any[] = [
    { label: 'العربية', value: 1 },
    { label: 'English', value: 2 },
  ];
  memberForm!:FormGroup;
  constructor(public dialofRef: DynamicDialogRef,fb:FormBuilder,private memberService:MembersService) {
    this.memberForm = fb.group({
      LangId:[1,Validators.required],
      Name: ['', Validators.required],
      Position: ['', Validators.required],
      file: ['', Validators.required],
    })
  }




  addMember(){
    const data = new FormData();
    const formValues = this.memberForm.value;
    Object.keys(formValues).forEach(k=>{
      if(k!=='file') data.append(k, formValues[k]);
    })
    if(this.selectedImg){
      data.append('file', this.selectedImg);
    }
    if(this.memberForm.valid){
      this.memberService.addMember(data).subscribe({
        next: () => this.dialofRef.close(true),
      });
    }

  }
  ImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImg = file;
      this.imagePreview = URL.createObjectURL(file);
    }
  }
}
