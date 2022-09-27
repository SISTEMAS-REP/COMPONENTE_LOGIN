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

@Component({
  selector: 'app-register-person-first-step',
  templateUrl: './register-person-first-step.component.html',
})
export class RegisterPersonFirstStepComponent implements OnInit {
  @Input() reniecResponse?: ReniecResponse;

  @Output() onSendDocumentNumber: EventEmitter<string> = new EventEmitter();
  @Output() onNextFormButton: EventEmitter<any> = new EventEmitter();

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

  rucNumberLength: number = 11;
  documentNumberLength: number = 0;
  phoneNumberLength: number = 9;

  showRucNumberField: boolean = false;

  myForm: FormGroup = this.fb.group({
    personId: [0],

    enableRuc: [null],
    rucNumber: [null],

    documentType: [0, [Validators.required, Validators.min(1)]],
    documentNumber: [
      null,
      { validators: [Validators.required], updateOn: 'blur' },
    ],
    firstName: [{ value: null, disabled: true }, [Validators.required]],
    lastName: [{ value: null, disabled: true }, [Validators.required]],
    departmentCode: [null],
    provinceCode: [null],
    districtCode: [null],
    address: [null],
    phoneNumber: [
      null,
      [
        Validators.required,
        Validators.minLength(this.phoneNumberLength),
        Validators.maxLength(this.phoneNumberLength),
      ],
    ],
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reniecResponse']) {
      this.resetReniecFields();
    }
  }

  resetFormFields() {
    this.myForm.reset({
      enableRuc: null,
      rucNumber: null,

      documentType: 0,
      documentNumber: null,
      phoneNumber: null,
    });

    this.resetReniecFields();
  }

  resetReniecFields() {
    this.myForm
      .get('personId')
      ?.reset(this.reniecResponse?.personId || 0, { emitEvent: false });

    this.myForm
      .get('firstName')
      ?.reset(this.reniecResponse?.firstName || null, { emitEvent: false });
    this.myForm
      .get('lastName')
      ?.reset(this.reniecResponse?.lastName || null, { emitEvent: false });

    this.myForm
      .get('departmentCode')
      ?.reset(this.reniecResponse?.departmentCode || null, {
        emitEvent: false,
      });
    this.myForm
      .get('provinceCode')
      ?.reset(this.reniecResponse?.provinceCode || null, { emitEvent: false });
    this.myForm
      .get('districtCode')
      ?.reset(this.reniecResponse?.districtCode || null, { emitEvent: false });
    this.myForm.get('address')?.reset(this.reniecResponse?.address || null, {
      emitEvent: false,
    });
  }

  resetRucField(enableRuc: boolean) {
    this.myForm.get('rucNumber')?.reset(null);

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
    this.myForm.get('rucNumber')?.updateValueAndValidity();
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

    this.myForm.get('personId')?.reset(null, { emitEvent: false });

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

    this.myForm.get('departmentCode')?.reset(null, {
      emitEvent: false,
    });
    this.myForm.get('provinceCode')?.reset(null, { emitEvent: false });
    this.myForm.get('districtCode')?.reset(null, { emitEvent: false });
    this.myForm.get('address')?.reset(null, { emitEvent: false });
  }

  ngOnInit(): void {
    this.myForm.get('enableRuc')?.valueChanges.subscribe((enableRuc) => {
      this.showRucNumberField = enableRuc;
      this.resetRucField(enableRuc);
    });

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

  isInvalidField(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }
}
