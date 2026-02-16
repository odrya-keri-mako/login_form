import { useEffect, useMemo, useRef, useState } from 'react';
import { validate } from './validators';

export default function App() {

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);

  const [isDark, setIsDark] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const hasEmail = email.trim().length > 0;
  const hasPass = password.trim().length > 0;

  const emailValid = useMemo(() => validate('email', email), [email]);
  const passValid  = useMemo(() => validate('password', password), [password]);

  const canLogin = emailValid && passValid;

  const clearEmail = () => {
    setEmail('');
    queueMicrotask(() => emailRef.current?.focus());
  };

  const clearPassword = () => {
    setPassword('');
    queueMicrotask(() => passRef.current?.focus());
  };

  const resetAll = () => {
    setEmail('');
    setPassword('');
    setShowPassword(false);
    queueMicrotask(() => emailRef.current?.focus());
  };

  const onLogin = () => {
    alert(`Az oldal közlendője\n\nEmail cím: ${email.trim()}\nJelszó: ${password.trim()}`);
    resetAll();
  };

  const onCancel = () => {
    const hasAny = hasEmail || hasPass;
    if (hasAny && !confirm('Az adatok elvesznek, biztos megszakítja?')) {
      queueMicrotask(() => emailRef.current?.focus());
      return;
    }
    alert('Megszakítva!');
    resetAll();
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100 px-2 position-relative 
                      justify-content-center align-items-center">

        {/* Toggle theme */}
        <div className="position-fixed top-0 end-0 
                        w-auto p-3 z-3 cursor-pointer"
             onClick={() => setIsDark(v => !v)} >
          <i className={`fa-solid fa-moon fa-lg ${isDark ? 'd-none' : ''}`} />
          <i className={`fa-solid fa-sun  fa-lg ${isDark ? '' : 'd-none'}`} />
        </div>

        {/* Form */}
        <form className="w-auto p-3 border rounded 
                         shadow-sm-bottom-end scale-in" 
              onSubmit={(e) => e.preventDefault()} >

          {/* Title */}
          <div className="row my-4 justify-content-center">
            <img src="/react.svg" 
                 className="mb-3" 
                 height="50" 
                 alt="logo" 
                 loading="lazy" />
            <h4 className="text-center">
              <i className="fa-solid fa-right-to-bracket me-1" />
              Bejelentkezés
            </h4>
          </div>

          {/* Email */}
          <div className="mb-4">

            {/* Label */}
            <label className="form-label fw-bold" 
                   htmlFor="email">
              <i className="fa-solid fa-star fa-2xs text-danger" />
              <i className="fa-solid fa-envelope me-1" />
              Email cím:
            </label>

            {/* Input */}
            <div className="position-relative 
                            d-flex flex-col align-items-center">
              <input ref={emailRef}
                     id="email"
                     type="email"
                     className="form-control pe-5"
                     placeholder="email cím"
                     autoComplete="email"
                     spellCheck={false}
                     required
                     maxLength={253}
                     value={email}
                     onChange={(e) => setEmail(e.target.value)} />

              {/* Clear icon */}
              <i className={`fa-solid fa-xmark text-primary fa-2xs 
                             end-0 me-5 position-absolute cursor-pointer 
                             ${hasEmail ? '' : 'invisible'}`}
                 onClick={clearEmail}
                 role="button" />

              {/* Check icon */}
              <i className={`fa-solid fa-check ms-3 text-success fw-bold 
                             ${emailValid ? '' : 'invisible'}`} />
            </div>
          </div>

          {/* Password */}
          <div className="mb-1">

            {/* Label */}
            <label className="form-label fw-bold" 
                   htmlFor="password">
              <i className="fa-solid fa-star fa-2xs text-danger" />
              <i className="fa-solid fa-key me-1" />
              Jelszó:
            </label>

            {/* Input */}
            <div className="position-relative 
                            d-flex flex-col align-items-center">
              <input ref={passRef}
                     id="password"
                     type={showPassword ? 'text' : 'password'}
                     className="form-control pe-5"
                     placeholder="jelszó"
                     autoComplete="current-password"
                     spellCheck={false}
                     minLength={6}
                     maxLength={20}
                     required
                     value={password}
                     onChange={(e) => setPassword(e.target.value)} />

              {/* Clear icon */}
              <i className={`fa-solid fa-xmark text-primary fa-2xs 
                             end-0 me-5 position-absolute cursor-pointer 
                             ${hasPass ? '' : 'invisible'}`}
                 onClick={clearPassword}
                 role="button" />

              {/* Check icon */}
              <i className={`fa-solid fa-check ms-3 text-success fw-bold 
                             ${passValid ? '' : 'invisible'}`} />
            </div>
          </div>

          {/* Password rule */}
          <div className="mb-2 fs-xs ms-1 me-5 text-break">
            6-20 karakter (legalább egy nagybetűt, egy kisbetűt és egy számot tartalmaz)
          </div>

          {/* Show/Hide password */}
          <div className="mb-5 d-flex align-items-center">

            {/* Input */}
            <input id="showPassword"
                   type="checkbox"
                   className="form-check-input m-0"
                   checked={showPassword}
                   onChange={(e) => setShowPassword(e.target.checked)} />

            {/* Label */}
            <label className="form-check-label fs-sm" 
                   htmlFor="showPassword">
              <i className="fa-solid fa-eye fa-sm ms-2" />
              jelszót megjelenít
            </label>
          </div>

          {/* Buttons */}
          <div className="text-center">

            {/* Login */}
            <button type="button"
                    className="btn btn-primary btn-form mx-2 mb-3 
                               shadow-sm-bottom-end btn-click-effect"
                    disabled={!canLogin}
                    onClick={onLogin} >
              <i className="fa-solid fa-right-to-bracket me-1" />
              Bejelentkezés
            </button>

            {/* Cancel */}
            <button type="button"
                    className="btn btn-secondary btn-form mx-2 mb-3 
                               shadow-sm-bottom-end btn-click-effect"
                    onClick={onCancel} >
              <i className="fa-solid fa-circle-xmark me-1" />
              Mégsem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
