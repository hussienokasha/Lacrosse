import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Question } from '../../../../Core/interfaces/question';
import { AccordionModule } from 'primeng/accordion';
import { QuestionService } from '../../../../Core/services/question.service';

@Component({
  selector: 'app-questions',
  imports: [TranslateModule, AccordionModule],
  standalone: true,
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent {
  questions?: Question[] = [];
  langId: number=2;
  constructor(private ques: QuestionService) {
    this.langId = localStorage.getItem('language')=='en'?2:1;
  }
  ngOnInit() {
    this.getQAndA();
  }
  getQAndA() {
    return this.ques.getQAndA(this.langId).subscribe({
      next: (data: Question[]) => {
        this.questions = data;
      },
    });
  }
}
