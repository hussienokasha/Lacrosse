import { Component } from '@angular/core';
import { ProgramsService } from '../../../../Core/services/programs.service';
import { Program } from '../../../../Core/interfaces/program';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Column } from '../../../../Core/interfaces/column';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProgramDialogComponent } from '../../components/program-dialog/program-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
  providers: [MessageService, ConfirmationService, DialogService],
})
export class ProgramsComponent {
  cols!: Column[];
  originalRowData: any = {};
  imgPreview!: string;
  langOptions: any[] = [
    { label: 'العربية', value: 1 },
    { label: ' En', value: 2 },
  ];
  programs?: Program[];
  selectedLang = new FormControl(1);
  imgFile!: File;
  constructor(
    private programService: ProgramsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {
    this.cols = [
      { field: 'img', header: 'Image' },
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
    ];
  }
  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    this.programService.getProgramsData(this.selectedLang.value!).subscribe({
      next: (data: Program[]) => {
        this.programs = data;
      },
    });
  }
  confirmDelete(event: Event, p: Program) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to proceed?',
      acceptButtonStyleClass: 'px-4 py-2 bg-red-500',
      rejectIcon: 'none',
      acceptIcon: 'none',
      rejectButtonStyleClass: 'px-4 py-2',

      accept: () => {
        this.programService.deleteProgram(p.id!).subscribe({
          next: () => {
            this.getPrograms();
            this.messageService.add({
              severity: 'info',
              summary: 'Delete',
              detail: 'Program Deleted Successfully',
            });
          },
        });
      },
    });
  }
  updateProgram(p: Program) {
    const data = new FormData();
    data.append('Id', p.id.toString());
    data.append('file', this.imgFile);
    data.append('Name', p.name);
    data.append('Description', p.description);

    this.programService.updateProgram(data).subscribe({
      next: () => {
        this.getPrograms();
        this.messageService.add({
          severity: 'info',
          summary: 'Update',
          detail: 'Program Updated Successfully',
        });
      },
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

  programDialog() {
    const ref = this.dialogService.open(ProgramDialogComponent, {
      header: 'Add Program',
    });
    ref.onClose.subscribe({
      next: (result) => {
        if (result) {
          this.getPrograms();
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: 'Program Added Successfully',
          });
        }
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
