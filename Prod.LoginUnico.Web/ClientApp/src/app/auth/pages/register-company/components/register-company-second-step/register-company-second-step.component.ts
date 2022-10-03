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
  @Input() migracionesResponse?: ReniecResponse;

  @Output() onSendDocumentNumber: EventEmitter<any> = new EventEmitter();
  @Output() onNextFormButton: EventEmitter<any> = new EventEmitter();
  @Output() onPreviewFormButton: EventEmitter<any> = new EventEmitter();

  docTypes: DocumentType[] = [
    {
      key: 1,
      value: 'DNI',
    },
    {
      key: 7,
      value: 'CARNET DE EXTRANJERÍA',
    },
  ];

  documentNumberLength: number = 0;

  myForm: FormGroup = this.fb.group({
    naturalPersonId: [0, [Validators.required, Validators.min(1)]],
    documentType: [0, [Validators.required, Validators.min(1)]],
    documentNumber: [
      null,
      { validators: [Validators.required], updateOn: 'blur' },
    ],
    firstName: [{ value: null, disabled: true }],
    lastName: [{ value: null, disabled: true }],
  });

  constructor(private fb: FormBuilder) {
    this.myForm.get('documentType')?.valueChanges.subscribe((documentType) => {
      console.log('valueChanges-documentType', documentType);
      this.setDocumentNumberLength(documentType);

      if (documentType == 1) {
        this.setReniecFields(false);
      } else if (documentType === 7) {
        this.setMigracionesFields(false);
      }

      this.resetDocumentValidators();
    });

    this.myForm
      .get('documentNumber')
      ?.valueChanges.subscribe((documentNumber) => {
        console.log('valueChanges-documentNumber', documentNumber);
        if (this.myForm.get('documentNumber')?.valid) {
          this.onSendDocumentNumber.emit({
            documentType: this.myForm.get('documentType')?.value,
            documentNumber: documentNumber,
          });
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reniecResponse']) {
      console.log('ngOnChanges-reniecResponse', this.reniecResponse);
      this.setReniecFields();
    }

    if (changes['migracionesResponse']) {
      console.log('ngOnChanges-migracionesResponse', this.migracionesResponse);
      this.setMigracionesFields();
    }
  }

  setDocumentNumberLength(documentType: number) {
    console.log('setDocumentNumberLength', documentType);
    if (documentType == 1) {
      this.documentNumberLength = 8;
    } else if (documentType == 7) {
      this.documentNumberLength = 9;
    } else {
      this.documentNumberLength = 0;
    }
  }

  resetFormFields() {
    console.log('resetFormFields');
    this.myForm.reset({
      naturalPersonId: 0,
      documentType: 0,
      documentNumber: null,
      firstName: null,
      lastName: null,
    });
  }

  setReniecFields(isUpdate: boolean = true) {
    console.log('setReniecFields', isUpdate);

    this.myForm
      .get('naturalPersonId')
      ?.reset(isUpdate ? this.reniecResponse?.personId || 0 : 0, {
        emitEvent: false,
      });

    if (!isUpdate) {
      this.myForm.get('documentNumber')?.reset(null, {
        emitEvent: false,
      });
    }

    this.myForm
      .get('firstName')
      ?.reset(isUpdate ? this.reniecResponse?.firstName || null : null, {
        emitEvent: false,
      });

    this.myForm
      .get('lastName')
      ?.reset(isUpdate ? this.reniecResponse?.lastName || null : null, {
        emitEvent: false,
      });
  }

  setMigracionesFields(isUpdate: boolean = true) {
    console.log('setMigracionesFields', isUpdate);

    this.myForm
      .get('naturalPersonId')
      ?.reset(isUpdate ? this.migracionesResponse?.personId || 0 : 0, {
        emitEvent: false,
      });

    if (!isUpdate) {
      this.myForm.get('documentNumber')?.reset(null, {
        emitEvent: false,
      });
    }

    this.myForm
      .get('firstName')
      ?.reset(isUpdate ? this.migracionesResponse?.firstName || null : null, {
        emitEvent: false,
      });

    this.myForm
      .get('lastName')
      ?.reset(isUpdate ? this.migracionesResponse?.lastName || null : null, {
        emitEvent: false,
      });
  }

  resetDocumentValidators() {
    console.log('resetDocumentValidators');
    this.myForm
      .get('documentNumber')
      ?.setValidators([
        Validators.required,
        Validators.minLength(this.documentNumberLength),
        Validators.maxLength(this.documentNumberLength),
      ]);
    this.myForm
      .get('documentNumber')
      ?.updateValueAndValidity({ emitEvent: false });
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
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }
}
