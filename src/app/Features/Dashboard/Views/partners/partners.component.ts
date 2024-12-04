import { Component } from '@angular/core';
import { PartnersService } from '../../../../Core/services/partners.service';
import { Partner } from '../../../../Core/interfaces/partner';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogService } from 'primeng/dynamicdialog';
import { PartnerDialogComponent } from '../../components/partner-dialog/partner-dialog.component';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [ConfirmPopupModule, ToastModule, CommonModule],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
  providers: [ConfirmationService, MessageService, DialogService],
})
export class PartnersComponent {
  partners?: Partner[];
  editMode: boolean = false;
  partnerToEdit!: Partner;
  imgPreview!: string | undefined;
  imgFile!: File;
  constructor(
    private partnerService: PartnersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getAllPartners();
  }
  getAllPartners() {
    this.partnerService.getAllParterners().subscribe({
      next: (p: Partner[]) => {
        this.partners = p;
      },
    });
  }

  partnerDialog() {
    const ref = this.dialogService.open(PartnerDialogComponent, {
      dismissableMask: true,
    });
    ref.onClose.subscribe({
      next: (d) => {
        if (d) {
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmed',
            detail: this.translate.instant('New Partner Added'),
            life: 3000,
          });
          this.getAllPartners();
        }
      },
    });
  }
  confirmDelete(event: Event, partner: Partner) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      acceptButtonStyleClass: 'bg-red-500 px-2 py-1',
      rejectButtonStyleClass: 'px-2 py-1',
      accept: () => {
        this.partnerService.deletePartner(partner.id).subscribe({
          next: () => {
            this.getAllPartners();
            this.messageService.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: this.translate.instant('Partner deleted'),
              life: 3000,
            });
          },
        });
      },
    });
  }
  updatePartner() {
    const data = new FormData();
    data.append('Id', this.partnerToEdit.id.toString());
    data.append('file', this.imgFile);
    if (this.imgPreview) {
      this.partnerService.updatePartner(data).subscribe({
        next: () => {
          this.getAllPartners();
          this.messageService.add({
            severity: 'info',
            summary: this.translate.instant('Success'),
            detail: this.translate.instant('Partner Updated Successfully'),
            life: 3000,
          });
          this.editMode = false;
          this.imgPreview = undefined;
        },
      });
    }
  }

  onImgSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.imgFile = file;
      this.imgPreview = URL.createObjectURL(file);
    }
  }
}
