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
  @Output() onCancelFormButton: EventEmitter<any> = new EventEmitter();

  rucNumberLength: number = 11;

  myForm: FormGroup = this.fb.group({
    juridicalPersonId: [0, [Validators.required, Validators.min(1)]],
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
    businessName: [null, [Validators.required]],
    businessAddress: [null, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {
    this.myForm.get('rucNumber')?.valueChanges.subscribe((rucNumber) => {
      console.log('valueChanges-rucNumber', rucNumber);
      if (
        this.myForm.get('rucNumber')?.valid &&
        this.myForm.get('rucNumber')?.value !== null
      ) {
        this.onSendRucNumber.emit(rucNumber);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sunatResponse']) {
      console.log('ngOnChanges-sunatResponse', this.sunatResponse);
      this.setSunatFields();
    }
  }

  resetFormFields() {
    this.myForm.reset({
      juridicalPersonId: 0,
      rucNumber: null,
      businessName: null,
      businessAddress: null,
    });
  }

  setSunatFields() {
    console.log('setSunatFields', this.sunatResponse);

    this.myForm
      .get('juridicalPersonId')
      ?.reset(this.sunatResponse?.personId || 0, { emitEvent: false });

    this.myForm
      .get('businessName')
      ?.reset(this.sunatResponse?.businessName || null, { emitEvent: false });

    this.myForm
      .get('businessAddress')
      ?.reset(this.sunatResponse?.businessAddress || null, {
        emitEvent: false,
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

  cancel() {
    this.onCancelFormButton.emit();
  }

  isInvalidField(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }
}
