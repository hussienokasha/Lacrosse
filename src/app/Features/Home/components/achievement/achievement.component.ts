import { Component } from '@angular/core';

import { Achievement } from '../../../../Core/interfaces/achievement';
import { AchievementService } from '../../../../Core/services/achievement.service';

@Component({
  selector: 'app-achievement',
  imports: [],
  standalone: true,
  templateUrl: './achievement.component.html',
  styleUrl: './achievement.component.scss',
})
export class AchievementComponent {
  achievement?: Achievement = undefined;
  langId: number=2;
  constructor(private achievService: AchievementService) {
    this.langId = localStorage.getItem('language')=='en'?2:1;
  }
  ngOnInit(): void {
    this.getAchievementData();
  }
  getAchievementData() {
    this.achievService.getAchievements(this.langId).subscribe({
      next: (a: Achievement) => {
        this.achievement = a;
      },
    });
  }
}
