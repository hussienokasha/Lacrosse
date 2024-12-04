import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AchievementService } from '../../../../Core/services/achievement.service';
import { Achievement } from '../../../../Core/interfaces/achievement';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ToastModule, TranslateModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush, // Added to improve performance with larger datasets
})
export class AchievementsComponent {
  achievementForm!: FormGroup;
  AchievementData?: Achievement;
  langOptions: any[] = [
    { label: 'عربي', value: 1 },
    { label: 'English', value: 2 },
  ];
  constructor(
    fb: FormBuilder,
    private achievementService: AchievementService,
    private messageService: MessageService,
    private transalte: TranslateService,
  ) {
    this.achievementForm = fb.group({
      langId: [1, Validators.required],
      title: ['', Validators.required],
      trainingSites: ['', Validators.required],
      maleStudents: ['', Validators.required],
      femaleStudents: ['', Validators.required],
      trainersTitle: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.getAchievementData();
  }
  getAchievementData() {
    this.achievementService
      .getAchievements(this.achievementForm.value['langId'])
      .subscribe({
        next: (data: Achievement) => {
          this.AchievementData = data;
          this.achievementForm.patchValue(data);
        },
      });
  }
  updateAchievement() {
    if (!this.achievementForm.pristine)
      this.achievementService
        .updateAchievement({
          id: this.AchievementData?.id,
          ...this.achievementForm.value,
        })
        .subscribe({
          next: () => {
            this.getAchievementData();
            this.messageService.add({
              severity: 'success',
              summary: this.transalte.instant('Success'),
              detail: this.transalte.instant('Achievement updated successfully'),
            });
          },
        });
  }
  onCancel() {
    if (this.AchievementData) {
      this.achievementForm.patchValue(this.AchievementData);
    }
  }
}
