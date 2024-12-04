import { Component } from '@angular/core';
import { LacrosseType } from '../../../../Core/interfaces/lacrose-type';
import { LacrosseTypeService } from '../../../../Core/services/lacrosse-type.service';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Column } from '../../../../Core/interfaces/column';
import { LacrosseTypeDialogComponent } from '../../components/lacrosse-type-dialog/lacrosse-type-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lacrosse-type',
  standalone: true,
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    FormsModule,
    ConfirmDialogModule,
    TranslateModule
  ],
  templateUrl: './lacrosse-type.component.html',
  styleUrl: './lacrosse-type.component.scss',
  providers: [ConfirmationService, MessageService, DialogService],
})
export class LacrosseTypeComponent {
  originalRowData: any = {};
  imgPreview!: string;
  imgFile!: File;

  langOptions: any[] = [
    { label: 'عربي', value: 1 },
    { label: 'English', value: 2 },
  ];

  selectedLang = new FormControl(1);
  Types?: LacrosseType[];
  cols!: Column[];

  constructor(
    private typesService: LacrosseTypeService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    this.cols = [
      {
        field: 'name',
        header: 'Name',
      },
      {
        field: 'img',
        header: 'Image',
      },
      {
        field: 'formation',
        header: 'Formation',
      },
      {
        field: 'preparation',
        header: 'Preparation',
      },
      {
        field: 'equipment',
        header: 'Equipment',
      },
      {
        field: 'contact',
        header: 'Contact',
      },
      {
        field: 'olympicPresence',
        header: 'Olympic Presence',
      },
      {
        field: 'popularity',
        header: 'Popularity',
      },
    ];
  }

  ngOnInit() {
    this.getTypes();
  }
  confirmDelete(event: MouseEvent, lt: LacrosseType) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      acceptButtonStyleClass: 'bg-red-500 px-2 py-1',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'px-2 py-1',
      accept: () => {
        this.typesService.deleteType(lt.id).subscribe({
          next: () => {
            this.getTypes();
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Record deleted',
              life: 3000,
            });
          },
        });
      },
    });
  }
  updateType(l: LacrosseType) {
    const data = new FormData();
    data.append('Id', l.id.toString());
    data.append('Name', l.name);
    data.append('Formation', l.formation);
    data.append('Preparation', l.preparation);
    data.append('Equipment', l.equipment);
    data.append('Contact', l.contact);
    data.append('OlympicPresence', l.olympicPresence);
    data.append('Popularity', l.popularity);
    if (this.imgFile) {
      data.append('file', this.imgFile);
    }
    this.typesService.editType(data).subscribe({
      next: () => {
        this.getTypes();
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: 'Type updated successfully',
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
  openDialog() {
    const ref = this.dialogService.open(LacrosseTypeDialogComponent, {
      header: 'Add Type',
    });
    ref.onClose.subscribe({
      next: (d: boolean) => {
        if (d) {
          this.getTypes();
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('Success'),
            detail: this.translate.instant('Type added successfully'),
          });
        }
      },
    });
  }
  getTypes() {
    this.typesService.getLacrosseTypes(this.selectedLang.value!).subscribe({
      next: (data: LacrosseType[]) => {
        this.Types = data;
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
