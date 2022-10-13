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
import { User } from 'src/app/home/interfaces/response/profile.response';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: [],
})
export class ProfileFormComponent implements OnInit {
  @Input() user?: User;

  @Output() onSaveFormButton: EventEmitter<any> = new EventEmitter();
  @Output() onBackFormButton: EventEmitter<any> = new EventEmitter();

  phoneNumberLength: number = 9;

  myForm: FormGroup = this.fb.group({
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
    if (changes['user']) {
      console.log('ngOnChanges-user', this.user);
      this.reset();
    }
  }

  reset() {
    this.myForm.reset({
      email: this.user?.email ?? null,
      phoneNumber: this.user?.phoneNumber ?? null,
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

  back() {
    this.onBackFormButton.emit();
  }

  isInvalidField(campo: string) {
    return (
      this.myForm.controls[campo].errors && this.myForm.controls[campo].touched
    );
  }
}
