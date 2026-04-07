export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isStrongPassword = (password: string): boolean =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);

export const onlyDigits = (value: string): string => value.replace(/\D/g, '');

export const isValidCpf = (cpf: string): boolean => {
  const cleaned = onlyDigits(cpf);

  if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) {
    return false;
  }

  const calcDigit = (base: string, factor: number): number => {
    const total = base
      .split('')
      .reduce((sum, digit) => sum + Number(digit) * factor--, 0);
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calcDigit(cleaned.slice(0, 9), 10);
  const secondDigit = calcDigit(cleaned.slice(0, 10), 11);

  return cleaned === `${cleaned.slice(0, 9)}${firstDigit}${secondDigit}`;
};
