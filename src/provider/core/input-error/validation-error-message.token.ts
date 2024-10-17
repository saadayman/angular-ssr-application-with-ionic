import { InjectionToken } from "@angular/core"

export const ERROR_MESSAGES:  { [key: string]: (args?: any) => string} = {
    required: (args) => `This Field is required!`,
    minLength: ({requiredLength, actualLenghth}) => `The length should be at least ${requiredLength}.`,
    max: ({max, actual}) => `Maximum value is: ${max}`,
    min: ({min, actual}) => `Minimum value is: ${min}`,
    notInteger: () => `This Field should be an integer.`,
    errorMsg: (args) => args,
    requiredTrue:(args) => 'Should be true'
}

export const VALIDATION_ERROR_MESSAGES = new InjectionToken('Error Validation message', {
    providedIn: 'root',
    factory:() => ERROR_MESSAGES
})