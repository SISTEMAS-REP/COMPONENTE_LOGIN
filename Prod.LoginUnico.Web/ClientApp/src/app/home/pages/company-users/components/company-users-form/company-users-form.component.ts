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
import { CompanyUser } from '../../../../interfaces/company-user';

@Component({
  selector: 'app-company-users-form',
  templateUrl: './company-users-form.component.html',
  styleUrls: [],
})
export class CompanyUsersFormComponent implements OnInit {
  @Input() companyUser?: CompanyUser;

  @Output() onSaveFormButton: EventEmitter<any> = new EventEmitter();

  phoneNumberLength: number = 9;

  myForm: FormGroup = this.fb.group({
    userId: [null],
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
    phoneNumber: [
      null,
      [
        Validators.required,
        Validators.minLength(this.phoneNumberLength),
        Validators.maxLength(this.phoneNumberLength),
      ],
    ],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['companyUser']) {
      console.log('ngOnChanges-companyUser', this.companyUser);
      this.reset();
    }
  }

  reset() {
    this.myForm.reset({
      userId: this.companyUser?.userId ?? null,
      email: this.companyUser?.email ?? null,
      phoneNumber: this.companyUser?.phoneNumber ?? null,
    });
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  save() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.onSaveFormButton.emit(this.myForm.value);
  }

  isInvalidField(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }
}
