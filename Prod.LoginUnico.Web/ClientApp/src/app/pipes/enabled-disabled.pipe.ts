import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enabledDisabled',
})
export class EnabledDisabledPipe implements PipeTransform {
  transform(value: any): any {
    return value ? 'ACTIVADO' : 'DESACTIVADO';
  }
}
