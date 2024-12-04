import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateForamt',
  standalone: true
})
export class DateForamtPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
