import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCaseFirst'
})
export class UpperCaseFirstPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    //return value.charAt(0).toUpperCase() + value.slice(1);
    return value.replace(/^\w/, c => c.toUpperCase());
  }
}
