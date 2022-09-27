import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mustMatchValidator } from 'src/app/helpers/custom-validators';
import { patternValidator } from '../../../../../helpers/custom-validators';

@Component({
  selector: 'app-register-company-third-step',
  templateUrl: './register-company-third-step.component.html',
})
export class RegisterCompanyThirdStepComponent implements OnInit {
  @Output() onNextFormButton: EventEmitter<any> = new EventEmitter();
  @Output() onPreviewFormButton: EventEmitter<any> = new EventEmitter();

  phoneNumberLength: number = 9;

  myForm: FormGroup = this.fb.group(
    {
      phoneNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(this.phoneNumberLength),
          Validators.maxLength(this.phoneNumberLength),
        ],
      ],
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
      repeatEmail: [
        null,
        [
          Validators.required,
          patternValidator(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            { email: true }
          ),
        ],
      ],
    },
    {
      // check whether our password and confirm password match
      validators: mustMatchValidator('email', 'repeatEmail'),
    }
  );

  constructor(private fb: FormBuilder) {}

  resetFormFields() {
    this.myForm.reset({
      phoneNumber: null,
      email: null,
      repeatEmail: null,
    });
  }

  ngOnInit(): void {}

  next() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.onNextFormButton.emit({ data: this.myForm.getRawValue() });
  }

  preview() {
    this.onPreviewFormButton.emit();
  }

  isInvalidField(campo: string) {
    return (
      this.myForm.controls[campo].errors &&
      this.myForm.controls[campo].touched
    );
  }
}
