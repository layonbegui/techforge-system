import { prisma } from '../config/prisma';

export class UserRepository {
  create(data: { name: string; email: string; password: string; cpf: string }) {
    return prisma.user.create({ data });
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  findByCpf(cpf: string) {
    return prisma.user.findUnique({ where: { cpf } });
  }

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  update(id: string, data: { name: string; password: string; cpf: string }) {
    return prisma.user.update({ where: { id }, data });
  }
}
