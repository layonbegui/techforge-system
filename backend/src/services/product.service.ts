import { CategoryRepository } from '../repositories/category.repository';
import { ProductRepository } from '../repositories/product.repository';
import { AppError } from '../errors/app-error';

export class ProductService {
  constructor(
    private readonly products = new ProductRepository(),
    private readonly categories = new CategoryRepository()
  ) {}

  async create(data: { name: string; description: string; price: number; categoryId: string }) {
    const category = await this.categories.findById(data.categoryId);
    if (!category) throw new AppError('Categoria não encontrada.', 404);
    return this.products.create(data);
  }

  async update(id: string, data: { name: string; description: string; price: number; categoryId: string }) {
    const found = await this.products.findById(id);
    if (!found) throw new AppError('Produto não encontrado.', 404);
    return this.createOrUpdate(id, data);
  }

  async delete(id: string) {
    const found = await this.products.findById(id);
    if (!found) throw new AppError('Produto não encontrado.', 404);
    return this.products.delete(id);
  }

  private async createOrUpdate(
    id: string,
    data: { name: string; description: string; price: number; categoryId: string }
  ) {
    const category = await this.categories.findById(data.categoryId);
    if (!category) throw new AppError('Categoria não encontrada.', 404);
    return this.products.update(id, data);
  }
}
