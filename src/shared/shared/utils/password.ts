export type PasswordValidationResult = {
  isValid: boolean;
  hasMinimumLength: boolean;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
};

export function validatePassword(password: string): PasswordValidationResult {
  const hasMinimumLength = password.length >= 8;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return {
    isValid: hasMinimumLength && hasLowercase && hasUppercase && hasNumber,
    hasMinimumLength,
    hasLowercase,
    hasUppercase,
    hasNumber,
  };
}
