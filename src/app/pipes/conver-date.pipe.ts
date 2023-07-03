import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'converDate'
})
export class ConverDatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const dateParts = value.split('-');
    const day = dateParts[2];
    const month = this.getMonthName(dateParts[1]);
    const year = dateParts[0];

    return `${day} ${month} ${year}`;
  }

  private getMonthName(month: string): string {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const monthIndex = parseInt(month) - 1;

    return monthNames[monthIndex] || '';
  }

}
