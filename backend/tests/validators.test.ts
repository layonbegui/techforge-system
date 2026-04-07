import { describe, expect, it } from 'vitest';
import { isStrongPassword, isValidCpf, isValidEmail } from '../src/utils/validators';

describe('validators', () => {
  it('deve validar email', () => {
    expect(isValidEmail('teste@email.com')).toBe(true);
    expect(isValidEmail('email-invalido')).toBe(false);
  });

  it('deve validar senha forte', () => {
    expect(isStrongPassword('Senha123')).toBe(true);
    expect(isStrongPassword('fraca')).toBe(false);
  });

  it('deve validar cpf', () => {
    expect(isValidCpf('52998224725')).toBe(true);
    expect(isValidCpf('11111111111')).toBe(false);
  });
});
