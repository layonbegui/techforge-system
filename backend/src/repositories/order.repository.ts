import { prisma } from '../config/prisma';

export class OrderRepository {
  create(data: {
    userId: string;
    productId: string;
    quantity: number;
    total: number;
    status: string;
  }) {
    return prisma.order.create({ data });
  }

  list(skip: number, take: number) {
    return prisma.order.findMany({
      skip,
      take,
      include: { user: true, product: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  count() {
    return prisma.order.count();
  }

  findById(id: string) {
    return prisma.order.findUnique({ where: { id } });
  }

  update(id: string, data: { productId: string; quantity: number; total: number; status: string }) {
    return prisma.order.update({ where: { id }, data });
  }

  delete(id: string) {
    return prisma.order.delete({ where: { id } });
  }
}
