import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patternValidator,} from 'src/app/helpers/custom-validators';

@Component({
  selector: 'app-recover-password-company-form',
  templateUrl: './recover-password-company-form.component.html'
})
export class RecoverPasswordCompanyFormComponent implements OnInit {
  @Input() applicationId?: number;
  @Output() onSendForm: EventEmitter<any> = new EventEmitter();
  @Output() onSendCancel: EventEmitter<any> = new EventEmitter();

  rucNumberLength: number = 11;
  documentNumberLength: number = 12;


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
        updateOn: 'blur',
      },
    ],
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
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  resetFormFields() {
    this.myForm.reset({
      rucNumber: null,
      documentNumber: null
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

