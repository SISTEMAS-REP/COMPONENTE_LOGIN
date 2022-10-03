import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-person-form',
  templateUrl: './login-person-form.component.html',
})
export class LoginPersonFormComponent implements OnInit {
  @Input() applicationId?: number;
  @Output() onSendForm: EventEmitter<any> = new EventEmitter();
  @Output() onCancelFormButton: EventEmitter<any> = new EventEmitter();

  documentNumberLength: number = 12;
  hidePassword: boolean = true;

  myForm: FormGroup = this.fb.group({
    documentNumber: [
      null,
      {
        validators: [
          Validators.required,
          Validators.minLength(this.documentNumberLength - 4),
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
      documentNumber: null,
      password: null,
    });
  }

  isInvalidField(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }

  saveForm = () => {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.onSendForm.emit(this.myForm.getRawValue());
  };

  cancel() {
    this.onCancelFormButton.emit();
  }
}
