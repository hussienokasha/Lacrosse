import { Component, input } from '@angular/core';

@Component({
  selector: 'app-baner',
  standalone:true,
  imports: [],
  templateUrl: './baner.component.html',
  styleUrl: './baner.component.scss'
})
export class BanerComponent {
title = input.required<string>();
}
