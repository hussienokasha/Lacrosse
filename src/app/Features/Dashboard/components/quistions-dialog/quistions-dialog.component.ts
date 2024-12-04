import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { SelectButtonModule } from 'primeng/selectbutton';

import { QuestionService } from '../../../../Core/services/question.service';

@Component({
  selector: 'app-quistions-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, SelectButtonModule],
  templateUrl: './quistions-dialog.component.html',
  styleUrl: './quistions-dialog.component.scss',
})
export class QuistionsDialogComponent {
  added: boolean = false;
  langOptions: any[] = [
    { label: 'عربي', value: 1 },
    { label: ' En', value: 2 },
  ];
  quistionsForm!: FormGroup;
  constructor(
    public dialofRef: DynamicDialogRef,
    fb: FormBuilder,
    private question: QuestionService
  ) {
    this.quistionsForm = fb.group({
      lang: ['', Validators.required],
      ques: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  addQuestion() {
    this.question
      .addQuestion({
        ques: this.quistionsForm.value['ques'],
        answer: this.quistionsForm.value['answer'],
        langId: this.quistionsForm.value['lang'],
      })
      .subscribe({
        next: () => {
          this.added = true;
          this.dialofRef.close(true);
        },
      });
  }
}
