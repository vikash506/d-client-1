import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolToStr'
})
export class BoolToStrPipe implements PipeTransform {

  transform(value: unknown): unknown {
    if(value == true)
      return 'Yes'
    else if(value == false)
      return 'No'
    return 'N/A'
  }

}
