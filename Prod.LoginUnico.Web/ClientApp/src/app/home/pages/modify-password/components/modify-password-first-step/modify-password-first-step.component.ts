import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modify-password-first-step',
  templateUrl: './modify-password-first-step.component.html'
})
export class ModifyPasswordFirstStepComponent implements OnInit {
  @Output() onNextFormButton: EventEmitter<any> = new EventEmitter();
  @Output() onCancelFormButton: EventEmitter<any> = new EventEmitter();
  hidePassword: boolean = true;

  myForm: FormGroup = this.fb.group(
    {     
      password: [
        null, [ Validators.required],
      ]
    }
  );


  constructor(
    private fb: FormBuilder
  ) { }


  resetFormFields() {
    this.myForm.reset({
      password: null,
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


