import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patternValidator,} from 'src/app/helpers/custom-validators';


@Component({
  selector: 'app-recover-password-person-form',
  templateUrl: './recover-password-person-form.component.html'
})
export class RecoverPasswordPersonFormComponent implements OnInit {
  @Input() applicationId?: number;
  @Output() onSendForm: EventEmitter<any> = new EventEmitter();
  @Output() onSendCancel: EventEmitter<any> = new EventEmitter();

  documentNumberLength: number = 8;

  myForm: FormGroup = this.fb.group({
    documentNumber: [
      null,
      {
        validators: [
          Validators.required,
          Validators.minLength(this.documentNumberLength - 1),
          Validators.maxLength(this.documentNumberLength),
        ],
      },
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
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  resetFormFields() {
    this.myForm.reset({
      documentNumber: null,
      email: null,
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

  cancel = () => {
    this.onSendCancel.emit();
  }
}

