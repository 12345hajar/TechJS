import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseBook',
  standalone: true
})
export class UppercaseBookPipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase();
  }

}
