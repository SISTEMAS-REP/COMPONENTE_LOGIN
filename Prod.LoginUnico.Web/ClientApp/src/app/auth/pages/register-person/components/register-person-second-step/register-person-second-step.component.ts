import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  mustMatchValidator,
  patternValidator,
} from 'src/app/helpers/custom-validators';

@Component({
  selector: 'app-register-person-second-step',
  templateUrl: './register-person-second-step.component.html',
})
export class RegisterPersonSecondStepComponent implements OnInit {
  @Output() onNextFormButton: EventEmitter<any> = new EventEmitter();
  @Output() onPreviewFormButton: EventEmitter<any> = new EventEmitter();

  hidePassword: boolean = true;
  hideRepeatPassword: boolean = true;

  myForm: FormGroup = this.fb.group(
    {
      email: [
        null,
        [
          Validators.required,
          patternValidator(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            { email: true }
          ),
        ],
      ],
      password: [
        null,
        [
          // 1. Password Field is Required
          Validators.required,
          // 2. check whether the entered password has a special character
          patternValidator(/[^\w]/, { hasSpecialCharacters: true }),
          // 3. check whether the entered password has a number
          patternValidator(/\d/, { hasNumber: true }),
          // 4. check whether the entered password has upper case letter
          patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          /*// 5. check whether the entered password has a lower-case letter
          patternValidator(/[a-z]/, { hasSmallCase: true }),*/
          // 6. Has a minimum length of 8 characters
          Validators.minLength(8),
        ],
      ],
      repeatPassword: [null, [Validators.required]],
      termsAndConditions: [null, [Validators.requiredTrue]],
      termsOfMessaging: [null, [Validators.requiredTrue]],
    },
    {
      // check whether our password and confirm password match
      validators: mustMatchValidator('password', 'repeatPassword'),
    }
  );

  constructor(private fb: FormBuilder) {}

  resetFormFields() {
    this.myForm.reset({
      email: null,
      password: null,
      repeatPassword: null,
      termsAndConditions: null,
      termsOfMessaging: null,
    });
  }

  ngOnInit(): void {}

  next() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.onNextFormButton.emit({
      finish: true,
      data: this.myForm.getRawValue(),
    });
  }

  preview() {
    this.onPreviewFormButton.emit();
  }

  isInvalidField(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }
}
