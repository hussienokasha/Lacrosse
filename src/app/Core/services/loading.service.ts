import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoad = signal<boolean>(false);

  show() {
    this.isLoad.set(true);
  }
  hide() {
    this.isLoad.set(false);
  }
}
