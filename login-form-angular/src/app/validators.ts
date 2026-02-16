import { Validators } from '@angular/forms';

const EMAIL_RE = /^[^\s@]+@(?:[^\s@]+\.)+[A-Za-z]{2,63}$/;
const PASSWORD_RE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const EmailValidators = [
  Validators.required,
  Validators.pattern(EMAIL_RE),
  Validators.maxLength(253)
];

export const PasswordValidators = [
  Validators.required,
  Validators.pattern(PASSWORD_RE),
  Validators.minLength(6),
  Validators.maxLength(20)
];
