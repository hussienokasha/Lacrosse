import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NewsService } from '../../../../Core/services/news.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-news-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, SelectButtonModule,TranslateModule],
  templateUrl: './news-dialog.component.html',
  styleUrl: './news-dialog.component.scss'
})
export class NewsDialogComponent {
  imgPreview!: string;
  imgFile!: File;
  newsForm!: FormGroup;
  langOptions: any[] = [
    { label: 'عربي', value: 1 },
    { label: ' En', value: 2 },
  ];

  constructor(
    fb: FormBuilder,
    private news: NewsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.newsForm = fb.group({
      LangId: [1, Validators.required],
      Title: ['', Validators.required],
      Content: ['', Validators.required],
      file: ['', Validators.required],
    });
  }



  addNews() {
    const data = new FormData();
    const formValues = this.newsForm.value;
    data.append('LangId', formValues.LangId.toString());
    data.append('Title', formValues.Title);
    data.append('Content', formValues.Content);
    data.append('file', this.imgFile);

    this.news.addNews(data).subscribe({
      next:()=>{
        this.ref.close(true);
      }
    })
  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input)
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imgFile = file;
      this.imgPreview = URL.createObjectURL(file);
    }
  }
}
