import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function patternValidator(
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // if control is empty return no error
    /*if (!control.value) {
      return null;
    }*/

    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);

    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : error;
  };
}

export function mustMatchValidator(
  controlName: string,
  matchingControlName: string
) {
  return (control: AbstractControl): ValidationErrors | null => {
    const error = { mustMatch: true };
    const input = control.get(controlName);
    const matchingInput = control.get(matchingControlName);

    if (input === null || matchingInput === null) {
      return null;
    }

    if (matchingInput?.errors && !matchingInput.errors.mustMatch) {
      return null;
    }

    // set error on matchingControl if validation fails
    if (input.value !== matchingInput.value) {
      matchingInput.setErrors(error);
      return error;
    } else {
      matchingInput.setErrors(null);
      return null;
    }
  };
}

/*
// deprecated
export function mustMatchValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
    return null;
  };
}
*/
