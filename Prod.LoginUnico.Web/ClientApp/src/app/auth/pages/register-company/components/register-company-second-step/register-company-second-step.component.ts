import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentType } from 'src/app/auth/interfaces/document-type';
import { ReniecResponse } from '../../../../interfaces/response/reniec.response';

@Component({
  selector: 'app-register-company-second-step',
  templateUrl: './register-company-second-step.component.html',
})
export class RegisterCompanySecondStepComponent implements OnInit {
  @Input() reniecResponse?: ReniecResponse;

  @Output() onSendDocumentNumber: EventEmitter<string> = new EventEmitter();
  @Output() onNextFormButton: EventEmitter<any> = new EventEmitter();
  @Output() onPreviewFormButton: EventEmitter<any> = new EventEmitter();

  docTypes: DocumentType[] = [
    {
      key: 1,
      value: 'DNI',
    },
    {
      key: 2,
      value: 'CARNET DE EXTRANJERÍA',
    },
  ];

  documentNumberLength: number = 0;

  myForm: FormGroup = this.fb.group({
    documentType: [0, [Validators.required, Validators.min(1)]],
    documentNumber: [
      null,
      { validators: [Validators.required], updateOn: 'blur' },
    ],
    firstName: [{ value: null, disabled: true }],
    lastName: [{ value: null, disabled: true }],
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reniecResponse']) {
      this.resetReniecFields();
    }
  }

  resetFormFields() {
    this.myForm.reset({
      documentType: 0,
      documentNumber: null,
    });

    this.resetReniecFields();
  }

  resetReniecFields() {
    this.myForm
      .get('firstName')
      ?.reset(this.reniecResponse?.firstName || null, { emitEvent: false });

    this.myForm
      .get('lastName')
      ?.reset(this.reniecResponse?.lastName || null, { emitEvent: false });
  }

  resetDocumentNumberField() {
    this.myForm.get('documentNumber')?.reset(null);
    this.myForm
      .get('documentNumber')
      ?.setValidators([
        Validators.required,
        Validators.minLength(this.documentNumberLength),
        Validators.maxLength(this.documentNumberLength),
      ]);
    this.myForm.get('documentNumber')?.updateValueAndValidity();

    this.myForm.get('lastName')?.reset(
      {
        value: null,
        disabled: this.myForm.get('documentType')?.value !== '2',
      },
      { emitEvent: false }
    );
    this.myForm.get('firstName')?.reset(
      {
        value: null,
        disabled: this.myForm.get('documentType')?.value !== '2',
      },
      { emitEvent: false }
    );
  }

  ngOnInit(): void {
    this.myForm.get('documentType')?.valueChanges.subscribe((documentType) => {
      if (documentType === '1') {
        this.documentNumberLength = 8;
      } else if (documentType === '2') {
        this.documentNumberLength = 9;
      } else {
        this.documentNumberLength = 0;
      }

      this.resetDocumentNumberField();
    });

    this.myForm
      .get('documentNumber')
      ?.valueChanges.subscribe((documentNumber) => {
        if (this.myForm.get('documentNumber')?.valid) {
          //console.log('documentNumber', documentNumber);
          this.onSendDocumentNumber.emit(documentNumber);
        }
      });
  }

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
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }
}
