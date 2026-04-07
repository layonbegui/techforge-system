import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../errors/app-error';
import { hashPassword } from '../utils/hash';
import { isStrongPassword, isValidCpf, isValidEmail, onlyDigits } from '../utils/validators';

export class UserService {
  constructor(private readonly users = new UserRepository()) {}

  async create(data: { name: string; email: string; password: string; cpf: string }) {
    if (!isValidEmail(data.email)) throw new AppError('E-mail inválido.');
    if (!isValidCpf(data.cpf)) throw new AppError('CPF inválido.');
    if (!isStrongPassword(data.password)) throw new AppError('Senha fraca.');
    if (await this.users.findByEmail(data.email)) throw new AppError('E-mail já cadastrado.');
    if (await this.users.findByCpf(onlyDigits(data.cpf))) throw new AppError('CPF já cadastrado.');

    const password = await hashPassword(data.password);
    const user = await this.users.create({ ...data, password, cpf: onlyDigits(data.cpf) });

    return { id: user.id, name: user.name, email: user.email, cpf: user.cpf };
  }

  async updateOwn(userId: string, data: { name: string; password: string; cpf: string }) {
    const user = await this.users.findById(userId);
    if (!user) throw new AppError('Usuário não encontrado.', 404);
    if (!isValidCpf(data.cpf)) throw new AppError('CPF inválido.');
    if (!isStrongPassword(data.password)) throw new AppError('Senha fraca.');

    const updated = await this.users.update(userId, {
      name: data.name,
      password: await hashPassword(data.password),
      cpf: onlyDigits(data.cpf)
    });

    return { id: updated.id, name: updated.name, email: updated.email, cpf: updated.cpf };
  }

  async getOwn(userId: string) {
    const user = await this.users.findById(userId);
    if (!user) throw new AppError('Usuário não encontrado.', 404);
    return { id: user.id, name: user.name, email: user.email, cpf: user.cpf };
  }
}
