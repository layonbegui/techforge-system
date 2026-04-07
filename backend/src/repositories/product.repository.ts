import { prisma } from '../config/prisma';

export class ProductRepository {
  create(data: {
    name: string;
    description: string;
    price: number;
    categoryId: string;
  }) {
    return prisma.product.create({ data });
  }

  list(skip: number, take: number) {
    return prisma.product.findMany({
      skip,
      take,
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  count() {
    return prisma.product.count();
  }

  findById(id: string) {
    return prisma.product.findUnique({ where: { id } });
  }

  update(
    id: string,
    data: { name: string; description: string; price: number; categoryId: string }
  ) {
    return prisma.product.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }
}
