export const emailRe = /^[^\s@]+@(?:[^\s@]+\.)+[A-Za-z]{2,63}$/;
export const passRe  = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export type ValidateType = 'email' | 'password';

export function validate(type: ValidateType, value: string): boolean {
  const v = (value ?? '').trim();
  if (type === 'email') return emailRe.test(v);
  return passRe.test(v);
}
