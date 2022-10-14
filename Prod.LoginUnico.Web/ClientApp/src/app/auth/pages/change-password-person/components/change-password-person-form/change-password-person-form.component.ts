import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { patternValidator,mustMatchValidator} from 'src/app/helpers/custom-validators';

@Component({
  selector: 'app-change-password-person-form',
  templateUrl: './change-password-person-form.component.html'
})
export class ChangePasswordPersonFormComponent implements OnInit {
  @Input() applicationId?: number;
  @Output() onSendForm: EventEmitter<any> = new EventEmitter();
  @Output() onSendCancel: EventEmitter<any> = new EventEmitter();

  hidePassword: boolean = true;
  hideRepeatPassword: boolean = true;

  myForm: FormGroup = this.fb.group(
    {     
      password: [
        null,
        [
          // 1. Password Field is Required
          Validators.required,
          // 2. check whether the entered password has a special character
          patternValidator(/[^\w]/, { hasSpecialCharacters: true }),
          // 3. check whether the entered password has a number
          patternValidator(/\d/, { hasNumber: true }),
          // 4. check whether the entered password has upper case letter
          patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          /*// 5. check whether the entered password has a lower-case letter
          patternValidator(/[a-z]/, { hasSmallCase: true }),*/
          // 6. Has a minimum length of 8 characters
          Validators.minLength(8),
        ],
      ],
      repeatPassword: [null, [Validators.required]]
    },
    {
      // check whether our password and confirm password match
      validators: mustMatchValidator('password', 'repeatPassword'),
    }
  );


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  resetFormFields() {
    this.myForm.reset({
      password: null,
      repeatPassword: null
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
