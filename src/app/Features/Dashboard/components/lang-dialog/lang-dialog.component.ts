import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-lang-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lang-dialog.component.html',
  styleUrl: './lang-dialog.component.scss',
})
export class LangDialogComponent {
  langForm!: FormGroup;

  constructor(public dialofRef: DynamicDialogRef) {}
  addLang() {
    throw new Error('Method not implemented.');
  }
}
