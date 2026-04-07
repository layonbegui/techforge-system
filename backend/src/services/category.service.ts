import { CategoryRepository } from '../repositories/category.repository';
import { AppError } from '../errors/app-error';

export class CategoryService {
  constructor(private readonly categories = new CategoryRepository()) {}

  create(name: string) {
    return this.categories.create(name);
  }

  async update(id: string, name: string) {
    await this.ensureExists(id);
    return this.categories.update(id, name);
  }

  async delete(id: string) {
    await this.ensureExists(id);
    return this.categories.delete(id);
  }

  private async ensureExists(id: string) {
    const found = await this.categories.findById(id);
    if (!found) throw new AppError('Categoria não encontrada.', 404);
  }
}
