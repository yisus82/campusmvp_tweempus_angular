import { Pipe, PipeTransform } from '@angular/core';
import { TweempModel } from './tweemp.model';

@Pipe({
  name: 'sortByDate',
  standalone: true,
  pure: false,
})
export class SortByDatePipe implements PipeTransform {
  transform(value: TweempModel[]): TweempModel[] {
    return value.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
  }
}
