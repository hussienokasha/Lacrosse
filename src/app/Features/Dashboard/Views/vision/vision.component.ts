import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Column } from '../../../../Core/interfaces/column';
import { Vision } from '../../../../Core/interfaces/vision';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VisionService } from '../../../../Core/services/vision.service';
import { DialogService } from 'primeng/dynamicdialog';
import { VisionDialogComponent } from '../../components/vision-dialog/vision-dialog.component';

@Component({
  selector: 'app-vision',
  standalone: true,
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    TableModule,
    ToastModule,
    FormsModule,
    ConfirmDialogModule,
  ],
  templateUrl: './vision.component.html',
  styleUrl: './vision.component.scss',
  providers: [ConfirmationService, MessageService, DialogService],
})
export class VisionComponent {
  originalRowData: any = {};
  imgPreview: any;
  imgFile!: File;

  langOptions: any[] = [
    { label: 'عربي', value: 1 },
    { label: 'English', value: 2 },
  ];

  selectedLang = new FormControl(1);
  visions?: Vision[];
  cols!: Column[];

  constructor(
    private visionService: VisionService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.cols = [
      {
        field: 'image',
        header: 'Image',
      },
      {
        field: 'header',
        header: 'Header',
      },
      {
        field: 'content',
        header: 'Content',
      },
    ];
  }

  ngOnInit() {
    this.getVision();
  }
  getVision() {
    this.visionService.getVisionAndMission(this.selectedLang.value!).subscribe({
      next: (data: Vision[]) => {
        this.visions = data;
      },
    });
  }

  openDialog() {
    const ref = this.dialogService.open(VisionDialogComponent, {header:"Add Vision And Mission"});
    ref.onClose.subscribe({next:(d:boolean) => {
      if(d){
        this.getVision();
        this.messageService.add({ severity:'success', summary: 'Confirmed', detail: 'New Vision & Mission Added' });
      }
    }})
  }
  confirmDelete(event: Event, v: Vision) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"px-4 py-2 ",
      acceptButtonStyleClass:"px-4 py-2 bg-red-500",
      accept: () => {
        this.visionService.deleteVision(v.id).subscribe({
          next: () => {
            this.getVision();
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Item Deleted Successfully' });
          }
        })
      },

  });
  }
  updateVision(vi: Vision) {
    const data = new FormData();
    data.append('Id', vi.id.toString());
    data.append('file', this.imgFile);
    data.append('Header', vi.header);
    data.append('Content', vi.content);

    this.visionService.editVision(data).subscribe({
      next: () => {
        this.getVision();
        this.messageService.add({
          severity: 'success',
          summary: 'updated',
          detail: 'Vision & Mission Updated Successfully',
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
