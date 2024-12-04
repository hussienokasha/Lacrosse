import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const [hours, minutes] = value.split(':').map(Number);
    const currentLanguage = localStorage.getItem('language') || 'en';

    const isPM = hours >= 12;
    const formattedHours = hours % 12 || 12; // تحويل إلى تنسيق 12 ساعة
    const formattedMinutes = minutes.toString().padStart(2, '0');

    let period = '';
    if (currentLanguage === 'ar') {
      period = isPM ? 'مساءً' : 'صباحًا';
    } else {
      period = isPM ? 'PM' : 'AM';
    }

    return `${formattedHours}:${formattedMinutes} ${period}`;
  }
}
