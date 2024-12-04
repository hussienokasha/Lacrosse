import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventsService } from '../../../../Core/services/events.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Events } from '../../../../Core/interfaces/events';


@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule,],
  templateUrl: './event-dialog.component.html',
  styleUrl: './event-dialog.component.scss',
})
export class EventDialogComponent {

  eventsForm!: FormGroup;
  currentImage?:string;
  imgFile!: File;
  imgPreview!: string;
  langOptions: any[] = [
    { label: 'العربية', value: 1 },
    { label: ' En', value: 2 },
  ];
  constructor(
    public ref: DynamicDialogRef,
    private eventsService: EventsService,
    public config: DynamicDialogConfig,
    fb: FormBuilder
  ) {
    this.eventsForm = fb.group({
      LangId: [1,Validators.required],
      Name: ['', Validators.required],
      Location: ['', Validators.required],
      Description: ['', Validators.required],
      Notes: ['', Validators.required],
      Longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      FromTime : ['', Validators.required],
      FromDay :['',Validators.required],
      ToTime:['',Validators.required],
      ToDay: ['', Validators.required],
      file: [''],
    });
  }

  ngOnInit() {
    if (this.config.data) {
      this.getEventDetails();
    }
  }
  addEvent() {

    const data = new FormData();
    const formValues = this.eventsForm.value;
    Object.keys(formValues).forEach((key) => {
      if (key !== 'file') {
        data.append(key, formValues[key]);
      }
    });
    if (this.imgFile) {
      data.append('file', this.imgFile);
    }
    if (this.eventsForm.valid) {
      this.eventsService.addEvent(data).subscribe({
        next: () => {
          this.ref.close(true);
        },
      });
    }
  }
  getEventDetails() {
    this.eventsService.getEventDetails(this.config.data).subscribe({
      next: (data: Events) => {
        this.currentImage = data.img;
        this.eventsForm.patchValue({
          LangId:data.langId,
          Name: data.name,
          Location: data.location,
          Description: data.description,
          Notes: data.notes,
          Longitude: data.longitude,
          latitude: data.latitude,
          FromTime : data.fromTime,
          FromDay :data.fromDay,
          ToTime:data.toTime,
          ToDay: data.toDay,
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
      this.currentImage = undefined
    }
  }

  editEvent() {
    const data = new FormData();
    const formValues = this.eventsForm.value;
    Object.keys(formValues).forEach((key) => {
      if (key !== 'LangId' && key !== 'file') {
        data.append(key, formValues[key]);
      }
    });
    if (this.config.data) {
      data.append('Id', this.config.data);
    }
    if (this.imgFile) {
      data.append('file', this.imgFile);
    }
    if (this.eventsForm.valid) {
      this.eventsService.updateEvent(data).subscribe({
        next: () => {
          this.ref.close(true);
        },
      });
    }
  }

  addOrUpdate(){
    if(this.config.data){
      this.editEvent();
    }
    else{
      this.addEvent();
    }
  }
}
