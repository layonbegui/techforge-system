import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../errors/app-error';
import { comparePassword } from '../utils/hash';
import { signToken } from '../utils/token';

export class AuthService {
  constructor(private readonly users = new UserRepository()) {}

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new AppError('Usuário não encontrado.', 404);

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) throw new AppError('Credenciais inválidas.', 401);

    return { token: signToken(user.id) };
  }
}
