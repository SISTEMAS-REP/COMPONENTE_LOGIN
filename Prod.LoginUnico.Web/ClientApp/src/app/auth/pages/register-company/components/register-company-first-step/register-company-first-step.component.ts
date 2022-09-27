import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patternValidator } from 'src/app/helpers/custom-validators';
import { SunatResponse } from '../../../../interfaces/response/sunat.response';

@Component({
  selector: 'app-register-company-first-step',
  templateUrl: './register-company-first-step.component.html',
})
export class RegisterCompanyFirstStepComponent implements OnInit {
  @Input() sunatResponse?: SunatResponse;

  @Output() onSendRucNumber: EventEmitter<string> = new EventEmitter();
  @Output() onNextFormButton: EventEmitter<any> = new EventEmitter();

  rucNumberLength: number = 11;

  myForm: FormGroup = this.fb.group({
    personId: [0],
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
    businessName: [{ value: null, disabled: true }],
    departmentCode: [null],
    provinceCode: [null],
    districtCode: [null],
    address: [{ value: null, disabled: true }],
  });

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sunatResponse']) {
      this.resetSunatFields();
    }
  }

  resetFormFields() {
    this.myForm.reset({
      rucNumber: null,
    });

    this.resetSunatFields();
  }

  resetSunatFields() {
    this.myForm
      .get('personId')
      ?.reset(this.sunatResponse?.personId || 0, { emitEvent: false });

    this.myForm
      .get('businessName')
      ?.reset(this.sunatResponse?.businessName || null, { emitEvent: false });

    this.myForm
      .get('departmentCode')
      ?.reset(this.sunatResponse?.departmentCode || null, { emitEvent: false });
    this.myForm
      .get('provinceCode')
      ?.reset(this.sunatResponse?.provinceCode || null, { emitEvent: false });
    this.myForm
      .get('districtCode')
      ?.reset(this.sunatResponse?.districtCode || null, { emitEvent: false });
    this.myForm
      .get('address')
      ?.reset(this.sunatResponse?.businessAddress || null, {
        emitEvent: false,
      });
  }

  ngOnInit(): void {
    this.myForm.get('rucNumber')?.valueChanges.subscribe((rucNumber) => {
      if (this.myForm.get('rucNumber')?.valid) {
        //console.log('rucNumber', rucNumber);
        this.onSendRucNumber.emit(rucNumber);
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

  preview() {}

  isInvalidField(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }
}
