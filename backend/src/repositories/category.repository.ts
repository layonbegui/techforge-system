import { prisma } from '../config/prisma';

export class CategoryRepository {
  create(name: string) {
    return prisma.category.create({ data: { name } });
  }

  list(skip: number, take: number) {
    return prisma.category.findMany({ skip, take, orderBy: { createdAt: 'desc' } });
  }

  count() {
    return prisma.category.count();
  }

  findById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  }

  update(id: string, name: string) {
    return prisma.category.update({ where: { id }, data: { name } });
  }

  delete(id: string) {
    return prisma.category.delete({ where: { id } });
  }
}
