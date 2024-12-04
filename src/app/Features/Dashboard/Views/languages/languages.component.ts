import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Language } from '../../../../Core/interfaces/language';
import { Column } from '../../../../Core/interfaces/column';
import { LanguageService } from '../../../../Core/services/language.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [
    ToastModule,
    ConfirmDialogModule,
    FormsModule,
    TableModule,
    TranslateModule,
  ],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss',
  providers:[ConfirmationService,MessageService]
})
export class LanguagesComponent {
  languages?: Language[];
updateLanguage(_t22: any) {
throw new Error('Method not implemented.');
}
onRowEditInit(_t22: any) {
throw new Error('Method not implemented.');
}
  cols!: Column[];

  constructor(private language:LanguageService) {
    this.cols = [
      {
        field: 'keyName',
        header: 'Key Name',
      },
      {
        field: 'isActive',
        header: 'Status',
      }
    ];
  }
ngOnInit(){
  this.getLangs();
}
  langDialog() {
    throw new Error('Method not implemented.');
  }

  onRowEditCancel(_t22: any, _t48: any) {
    throw new Error('Method not implemented.');
  }
  confirmDelete($event: MouseEvent, _t22: any) {
    throw new Error('Method not implemented.');
  }

  getLangs(){
    this.language.getAllLangs().subscribe({
      next: (data: Language[]) => {
        this.languages = data;
      },
    })
  }
}
