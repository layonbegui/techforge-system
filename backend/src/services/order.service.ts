import { OrderRepository } from '../repositories/order.repository';
import { ProductRepository } from '../repositories/product.repository';
import { AppError } from '../errors/app-error';

export class OrderService {
  constructor(
    private readonly orders = new OrderRepository(),
    private readonly products = new ProductRepository()
  ) {}

  async create(userId: string, data: { productId: string; quantity: number; status: string }) {
    const product = await this.products.findById(data.productId);
    if (!product) throw new AppError('Produto não encontrado.', 404);

    return this.orders.create({
      userId,
      productId: data.productId,
      quantity: data.quantity,
      status: data.status,
      total: product.price * data.quantity
    });
  }

  async update(id: string, data: { productId: string; quantity: number; status: string }) {
    const found = await this.orders.findById(id);
    if (!found) throw new AppError('Pedido não encontrado.', 404);

    const product = await this.products.findById(data.productId);
    if (!product) throw new AppError('Produto não encontrado.', 404);

    return this.orders.update(id, {
      productId: data.productId,
      quantity: data.quantity,
      status: data.status,
      total: product.price * data.quantity
    });
  }

  async delete(id: string) {
    const found = await this.orders.findById(id);
    if (!found) throw new AppError('Pedido não encontrado.', 404);
    return this.orders.delete(id);
  }
}
