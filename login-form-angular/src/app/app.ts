import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faRightToBracket, faMoon, faSun, faEye, faEnvelope,
  faKey, faCircleXmark, faCheck, faXmark, faStar
} from '@fortawesome/free-solid-svg-icons';
import { EmailValidators, PasswordValidators } from './validators';

type FormControls = {
  email: FormControl<string>;
  password: FormControl<string>;
  showPassword: FormControl<boolean>;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements AfterViewInit {

  icon = { faRightToBracket, faMoon, faSun, faEye, faEnvelope,
           faKey, faCircleXmark, faCheck, faXmark, faStar };

  isDark = true;

  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  formGroup: FormGroup<FormControls>;

  constructor(
    private fb: NonNullableFormBuilder,
    private renderer: Renderer2
  ) {
    this.formGroup = this.fb.group<FormControls>({
      email: this.fb.control('', EmailValidators),
      password: this.fb.control('', PasswordValidators),
      showPassword: this.fb.control(false),
    });

    this.applyTheme();
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.emailInput?.nativeElement.focus());
  }

  private get emailCtrl() { return this.formGroup.controls.email; }
  private get passCtrl()  { return this.formGroup.controls.password; }

  hasValue(ctrl: 'email' | 'password'): boolean {
    const value = ctrl === 'email' ?  this.emailCtrl.value : 
                                      this.passCtrl.value;
    return value.trim().length > 0;
  }

  isValid(ctrl: 'email' | 'password'): boolean {
    return ctrl === 'email' ? this.emailCtrl.valid : this.passCtrl.valid;
  }

  clear(ctrl: 'email' | 'password'): void {
    const control = ctrl === 'email' ? this.emailCtrl : this.passCtrl;
    control.setValue('');
    control.markAsPristine();
    control.markAsUntouched();

    queueMicrotask(() => {
      (ctrl === 'email' ? this.emailInput : 
                          this.passwordInput)?.nativeElement.focus();
    });
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    this.applyTheme();
  }

  private applyTheme(): void {
    this.renderer.setAttribute(
      document.body,
      'data-bs-theme',
      this.isDark ? 'dark' : 'light'
    );
  }

  onSubmit(): void {
    const { email, password } = this.formGroup.getRawValue();
    alert(`Email cím: ${email}\nJelszó: ${password}`);
    this.reset();
  }

  cancel(): void {
    const hasAny = this.hasValue('email') || this.hasValue('password');

    if (hasAny && !confirm('Az adatok elvesznek, biztos megszakítja?')) {
      queueMicrotask(() => this.emailInput?.nativeElement.focus());
      return;
    }

    alert('Megszakítva!');
    this.reset();
  }

  reset(): void {
    this.formGroup.reset({ email: '', password: '', showPassword: false });
    queueMicrotask(() => this.emailInput?.nativeElement.focus());
  }
}
