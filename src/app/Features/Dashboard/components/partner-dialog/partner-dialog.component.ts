import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PartnersService } from '../../../../Core/services/partners.service';

@Component({
  selector: 'app-partner-dialog',
  standalone: true,
  imports: [],
  templateUrl: './partner-dialog.component.html',
  styleUrl: './partner-dialog.component.scss',
})
export class PartnerDialogComponent {
  imgPreview?: string;
  imgAdded:boolean=false;
  imgSelected!:File
  constructor(public ref:DynamicDialogRef,private partnerService:PartnersService){}
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imgSelected = file;
      this.imgPreview = URL.createObjectURL(file);
    }
  }

  addPartner(){
    const img = new FormData()
    img.append('file', this.imgSelected);
    this.partnerService.addPertner(img).subscribe({
      next:()=>{
        this.imgAdded = true;
        this.ref.close(true);
      }
    })
  }
}
