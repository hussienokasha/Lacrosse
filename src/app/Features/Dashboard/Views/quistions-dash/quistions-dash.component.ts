import { Component, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Column } from '../../../../Core/interfaces/column';
import { Question } from '../../../../Core/interfaces/question';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { QuistionsDialogComponent } from '../../components/quistions-dialog/quistions-dialog.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { QuestionService } from '../../../../Core/services/question.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-quistions',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    ConfirmPopupModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    TranslateModule
  ],
  templateUrl: './quistions-dash.component.html',
  styleUrl: './quistions-dash.component.scss',
  providers: [DialogService, ConfirmationService, MessageService],
})
export class QuistionsDashComponent {
  originalRowData: any = {};
  langOptions: any[] = [
    { label: 'العربية', value: 1 },
    { label: ' En', value: 2 },
  ];
  cols!: Column[];
  questions?: Question[];
  selectedLang = new FormControl(1);
  constructor(
    private question: QuestionService,
    private dialog: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.cols = [
      { field: 'ques', header: 'Question' },
      { field: 'answer', header: 'Answer' },
    ];
  }

  ngOnInit() {
    this.getQAndA();
  }
  getQAndA() {
    this.question.getQAndA(this.selectedLang.value!).subscribe({
      next: (data: Question[]) => {
        this.questions = data;
      },
    });
  }
  openDialog() {
    const ref = this.dialog.open(QuistionsDialogComponent, {
      dismissableMask: true,
    });
    ref.onClose.subscribe((d) => {
      if (d) {
        this.getQAndA();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'New Q&A Added Successfully',
        });
      }
    });
  }
  updateQuestion(qData: Question) {
    this.question.updateQandA(qData).subscribe({
      next: () => {
        this.getQAndA();
        this.messageService.add({severity:'success', summary:'Success', detail:'Q&A updated successfully'});
      },
    })
  }

  confirmDelete(event: Event,q:Question) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.question.deleteQuestion(q.id!).subscribe({
          next: () => {
            this.getQAndA();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Q&A Deleted Successfully',
            });
          },
        });
      },

    });
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
}
