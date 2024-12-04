import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Member } from '../../../../Core/interfaces/member';
import {
  DialogService,
  DynamicDialogComponent,
  DynamicDialogModule,
} from 'primeng/dynamicdialog';
import { MemberDialogComponent } from '../../components/member-dialog/member-dialog.component';
import { Column } from '../../../../Core/interfaces/column';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembersService } from '../../../../Core/services/members.service';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    TableModule,
    DynamicDialogModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
  providers: [DialogService, MessageService, ConfirmationService,],
})
export class MembersComponent {
  imgPreview!: string;
  imgFile!: File;
  cols!: Column[];
  originalRowData: any = {};
  selectedLang = new FormControl(1);
  members!: Member[];
  langOptions: any[] = [
    { label: 'عربي', value: 1 },
    { label: 'English', value: 2 },
  ];
  constructor(
    private dialogService: DialogService,
    private membersService: MembersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
  ) {}
  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'position', header: 'Position' },
      { field: 'img', header: 'Image' },
    ];
    this.getAllMembers();
  }
  showMemberDialog() {
    const ref = this.dialogService.open(MemberDialogComponent, {
      dismissableMask: true,
    });
    ref.onClose.subscribe({
      next: (d: boolean) => {
        if (d) {
          this.getAllMembers();
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('Success'),
            detail: this.translate.instant('Member Added Successfully'),
          });
        }
      },
    });
  }

  getAllMembers() {
    this.membersService.getMembers(this.selectedLang.value!).subscribe({
      next: (data: Member[]) => {
        this.members = data;
      },
    });
  }
  updateMember(m: Member) {
    const data = new FormData();
    data.append('Id', m.id.toString());
    data.append('Name', m.name);
    data.append('Position', m.position);
    data.append('file', this.imgFile);
    this.membersService.updateMember(data).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('Success'),
          detail: this.translate.instant('Member Updated Successfully'),
        });
        this.getAllMembers();
      },
    });
  }
  confirmDelete(event: Event, m: Member) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translate.instant('Do you want to delete this record?'),
      acceptButtonStyleClass: 'bg-red-500 px-2 py-1',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass: 'px-2 py-1',
      accept: () => {
        this.membersService.deleteMember(m.id).subscribe({
          next: () => {
            this.getAllMembers();
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
