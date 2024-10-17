import { Pipe, PipeTransform, inject } from '@angular/core';
import { VALIDATION_ERROR_MESSAGES } from './validation-error-message.token';

@Pipe({
  name: 'nixErrorMessage',
  standalone: true
})
export class ErrorMessagePipe implements PipeTransform {
  private errorMap = inject(VALIDATION_ERROR_MESSAGES)
  
  transform(key: string, errorValue: any): string {
    console.log(key, errorValue)
    if (!this.errorMap[key]) {
      console.warn(`Missing message for ${key} validator...`)
      console.log(key);
      console.log(errorValue);
      return ''
    }
    if (this.errorMap[key]) {
      return this.errorMap[key](errorValue)
    }
  }

}
