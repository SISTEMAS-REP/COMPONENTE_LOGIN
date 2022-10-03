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
import { patternValidator } from 'src/app/helpers/custom-validators';
import { ReniecResponse } from '../../../../interfaces/response/reniec.response';
import { SunatResponse } from '../../../../interfaces/response/sunat.response';

@Component({
  selector: 'app-register-person-first-step',
  templateUrl: './register-person-first-step.component.html',
})
export class RegisterPersonFirstStepComponent implements OnInit {
  @Input() sunatResponse?: SunatResponse;
  @Input() reniecResponse?: ReniecResponse;
  @Input() migracionesResponse?: ReniecResponse;

  @Output() onSendRucNumber: EventEmitter<string> = new EventEmitter();
  @Output() onSendDocumentNumber: EventEmitter<any> = new EventEmitter();
  @Output() onNextFormButton: EventEmitter<any> = new EventEmitter();
  @Output() onCancelFormButton: EventEmitter<any> = new EventEmitter();

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

  rucNumberLength: number = 11;
  documentNumberLength: number = 0;
  phoneNumberLength: number = 9;

  showRucNumberField: boolean = false;

  myForm: FormGroup = this.fb.group({
    personId: [0, [Validators.required, Validators.min(1)]],
    enableRuc: [null],
    rucNumber: [null, { updateOn: 'blur' }],

    documentType: [0, [Validators.required, Validators.min(1)]],
    documentNumber: [
      null,
      { validators: [Validators.required], updateOn: 'blur' },
    ],
    firstName: [{ value: null, disabled: true }],
    lastName: [{ value: null, disabled: true }],

    phoneNumber: [
      null,
      [
        Validators.required,
        Validators.minLength(this.phoneNumberLength),
        Validators.maxLength(this.phoneNumberLength),
      ],
    ],
  });

  constructor(private fb: FormBuilder) {
    this.myForm.get('enableRuc')?.valueChanges.subscribe((enableRuc) => {
      console.log('valueChanges-enableRuc', enableRuc);
      this.showRucNumberField = enableRuc;
      this.setSunatFields(false);
      this.resetRucValidators(enableRuc);
    });

    this.myForm.get('rucNumber')?.valueChanges.subscribe((rucNumber) => {
      console.log('valueChanges-rucNumber', rucNumber);
      if (
        this.myForm.get('rucNumber')?.valid &&
        this.myForm.get('rucNumber')?.value !== null
      ) {
        this.onSendRucNumber.emit(rucNumber);
      }
    });

    this.myForm.get('documentType')?.valueChanges.subscribe((documentType) => {
      console.log('valueChanges-documentType', documentType);
      this.setDocumentNumberLength(documentType);

      if (documentType == 1) {
        this.setReniecFields(false);
      } else if (documentType == 7) {
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
    if (changes['sunatResponse']) {
      console.log('ngOnChanges-sunatResponse', this.sunatResponse);
      this.setSunatFields();
    }

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
      personId: 0,
      enableRuc: null,
      rucNumber: null,

      documentType: 0,
      documentNumber: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
    });
  }

  setSunatFields(isUpdate: boolean = true) {
    console.log('setSunatFields', isUpdate);

    this.myForm
      .get('personId')
      ?.reset(isUpdate ? this.sunatResponse?.personId || 0 : 0, {
        emitEvent: false,
      });

    if (!isUpdate) {
      this.myForm.get('rucNumber')?.reset(null, {
        emitEvent: false,
      });
    }

    const documentType = isUpdate ? this.sunatResponse?.documentType || 0 : 0;
    this.myForm.get('documentType')?.reset(documentType, {
      emitEvent: false,
    });

    this.myForm
      .get('documentNumber')
      ?.reset(isUpdate ? this.sunatResponse?.documentNumber || null : null, {
        emitEvent: false,
      });
    this.setDocumentNumberLength(documentType);
    this.resetDocumentValidators();

    this.myForm
      .get('firstName')
      ?.reset(isUpdate ? this.sunatResponse?.firstName || null : null, {
        emitEvent: false,
      });

    this.myForm
      .get('lastName')
      ?.reset(isUpdate ? this.sunatResponse?.lastName || null : null, {
        emitEvent: false,
      });
  }

  setReniecFields(isUpdate: boolean = true) {
    console.log('setReniecFields', isUpdate);

    this.myForm
      .get('personId')
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
      .get('personId')
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

  resetRucValidators(enableRuc: boolean) {
    console.log('resetRucValidators', enableRuc);
    if (enableRuc) {
      this.myForm.get('rucNumber')?.setValidators([
        Validators.required,
        Validators.minLength(this.rucNumberLength),
        Validators.maxLength(this.rucNumberLength),
        // Starts with 10 then digits rest.
        patternValidator(/10\d{9}/, { startsWith: true }),
      ]);
    } else {
      this.myForm.get('rucNumber')?.clearValidators();
    }

    this.myForm.get('rucNumber')?.updateValueAndValidity({ emitEvent: false });
  }

  resetDocumentValidators() {
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

  cancel() {
    this.onCancelFormButton.emit();
  }

  isInvalidField(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }
}
