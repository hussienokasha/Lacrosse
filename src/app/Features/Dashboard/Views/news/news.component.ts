import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Column } from '../../../../Core/interfaces/column';
import { News } from '../../../../Core/interfaces/news';
import { NewsService } from '../../../../Core/services/news.service';
import { CommonModule } from '@angular/common';
import { NewsDialogComponent } from '../../components/news-dialog/news-dialog.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    TranslateModule,
    CommonModule
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
  providers: [MessageService, ConfirmationService, DialogService,],
})
export class NewsComponent {
  cols!: Column[];
  originalRowData: any = {};
  langOptions: any[] = [
    { label: 'العربية', value: 1 },
    { label: ' En', value: 2 },
  ];
  imgPreview: any;
  News?: News[];
  selectedLang = new FormControl(1);
  imgFile!: File;

  constructor(
    private newsService: NewsService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    this.cols = [
      { field: 'img', header: 'Image' },
      { field: 'title', header: 'Title' },
      { field: 'content', header: 'Content' },
      { field: 'oldOrNew', header: 'Old or New' },
      { field: 'postTime', header: 'Post Time' },
    ];
  }

  ngOnInit() {
    this.getNews();
  }
  newsDialog() {
    this.dialogService.open(NewsDialogComponent,{header:"Add New News"}).onClose.subscribe({
      next: () => {
        this.getNews();
        this.messageService.add({ severity:'success', summary: 'Success', detail: 'New News Added' });
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
  onRowEditInit(rowData: any) {
    this.originalRowData[rowData.id] = { ...rowData };
  }
  onRowEditCancel(rowData: any, td: any) {
    if (this.originalRowData[rowData.id]) {
      Object.assign(rowData, this.originalRowData[rowData.id]); // Restore original data
      delete this.originalRowData[rowData.id]; // Clean up after restoring
    }
    td.cancelRowEdit(rowData);
  }
  updateNews(n: News) {
    const data = new FormData();
    data.append('Id', n.id.toString());
    data.append('file', this.imgFile);
    data.append('Title', n.title);
    data.append('Content', n.content);

    this.newsService.updateNews(data).subscribe({
      next: () => {
        this.getNews();
        this.messageService.add({
          severity: 'info',
          summary: 'Update',
          detail: 'News Updated Successfully',
        });
      },
    });
  }
  getNews() {
    this.newsService.getNews(this.selectedLang.value!).subscribe({
      next: (data: News[]) => {
        this.News = data;
      },
    });
  }
  confirmDelete(event: Event, n: News) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to proceed?',
      acceptButtonStyleClass: 'px-4 py-2 bg-red-500',
      rejectIcon: 'none',
      acceptIcon: 'none',
      rejectButtonStyleClass: 'px-4 py-2',

      accept: () => {
        this.newsService.deleteNews(n.id!).subscribe({
          next: () => {
            this.getNews();
            this.messageService.add({
              severity: 'info',
              summary: 'Delete',
              detail: 'News Deleted Successfully',
            });
          },
        });
      },
    });
  }
}
