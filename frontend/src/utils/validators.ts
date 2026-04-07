export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateCpf = (cpf: string) => cpf.replace(/\D/g, '').length === 11;

export const validateStrongPassword = (password: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
