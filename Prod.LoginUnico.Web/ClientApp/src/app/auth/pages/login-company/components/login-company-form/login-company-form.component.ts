import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { enumerados } from 'src/app/enums/enumerados';
import { patternValidator } from 'src/app/helpers/custom-validators';

@Component({
  selector: 'app-login-company-form',
  templateUrl: './login-company-form.component.html',
})
export class LoginCompanyFormComponent implements OnInit {
  @Input() applicationId?: number;
  @Output() onSendForm: EventEmitter<any> = new EventEmitter();

  documentNumberLength: number = 8;
  rucNumberLength: number = 11;
  hidePassword: boolean = true;

  myForm: FormGroup = this.fb.group({
    rucNumber: [
      null,
      {
        validators: [
          Validators.required,
          Validators.minLength(this.rucNumberLength),
          Validators.maxLength(this.rucNumberLength),
          // Starts with 20 then digits rest.
          patternValidator(/20\d{9}/, { startsWith: true }),
        ],
      },
    ],

    documentNumber: [
      null,
      {
        validators: [
          Validators.required,
          Validators.minLength(this.documentNumberLength),
          Validators.maxLength(this.documentNumberLength),
        ],
      },
    ],

    password: [null, { validators: [Validators.required] }],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  resetFormFields() {
    this.myForm.reset({
      rucNumber: null,
      documentNumber: null,
      password: null,
    });
  }

  isInvalidField(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }

  guardar = () => {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.onSendForm.emit(this.myForm.getRawValue());
  };
}
