import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    if (value.length==2) {
      return value.toUpperCase()
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
