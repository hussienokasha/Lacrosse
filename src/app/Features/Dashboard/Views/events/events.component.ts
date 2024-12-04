import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EventDialogComponent } from '../../components/event-dialog/event-dialog.component';
import { EventsService } from '../../../../Core/services/events.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Events } from '../../../../Core/interfaces/events';

import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TimeFormatPipe } from "../../../../Core/utils/Pipes/time-format.pipe";

@Component({
  selector: 'app-events',
  imports: [
    TableModule,
    FormsModule,
    ConfirmPopupModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule,
    CommonModule,
    ConfirmDialogModule,
    TranslateModule,
    TimeFormatPipe
],
  standalone: true,
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
  providers: [DialogService, ConfirmationService, MessageService],
})
export class EventsComponent {
  events?: Events[];
  selectedLang = new FormControl(1);

  langOptions: any[] = [
    { label: 'العربية', value: 1 },
    { label: ' En', value: 2 },
  ];
  constructor(
    private dialogService: DialogService,
    private eventsService: EventsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private transalte: TranslateService
  ) {}
  ngOnInit(): void {
    this.getAllEvents();
  }
  addEventDialog() {
    const ref = this.dialogService.open(EventDialogComponent, {
      header: this.transalte.instant('Add Event'),
      width: '60vw',
    });
    ref.onClose.subscribe({
      next: (d) => {
        if (d) {
          this.messageService.add({
            severity: 'success',
            summary: this.transalte.instant('Success'),
            detail: this.transalte.instant('Event Added Successfully'),
          });
          this.getAllEvents();
        }
      },
    });
  }
  editEventDialog(eventId: number) {
    const ref = this.dialogService.open(EventDialogComponent, {
      data: eventId,
      header: this.transalte.instant('Update Event'),
      width: '60vw',
    });
    ref.onClose.subscribe({
      next: (d) => {
        if (d) {
          this.messageService.add({
            severity: 'success',
            summary: this.transalte.instant('Success'),
            detail: this.transalte.instant('Event Updated Successfully'),
          });
          this.getAllEvents();
        }
      },
    });
  }

  getAllEvents() {
    this.eventsService.getEvents(this.selectedLang.value!).subscribe({
      next: (data: Events[]) => {
        this.events = data;
      },
    });
  }
  confirmDelete(event: Event, e: Events) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.transalte.instant('Are you sure that you want to proceed?'),
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'px-4 py-2 ',
      dismissableMask: true,
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptButtonStyleClass: 'px-4 py-2 bg-red-500',
      accept: () => {
        this.eventsService.deleteEvent(e.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'info',
              summary: this.transalte.instant('Success'),
              detail: this.transalte.instant('Event Deleted Successfully'),
            });
            this.getAllEvents();
          },
        });
      },
    });
  }
}
