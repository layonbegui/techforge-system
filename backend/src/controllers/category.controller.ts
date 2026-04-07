import { Request, Response } from 'express';
import { categorySchema } from '../dtos/category.dto';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryService } from '../services/category.service';
import { getPagination } from '../utils/pagination';

const service = new CategoryService();
const repository = new CategoryRepository();

export class CategoryController {
  async create(request: Request, response: Response) {
    const body = categorySchema.parse(request.body);
    const result = await service.create(body.name);
    return response.status(201).json(result);
  }

  async list(request: Request, response: Response) {
    const { skip, limit, page } = getPagination(String(request.query.page), String(request.query.limit));
    const [items, total] = await Promise.all([repository.list(skip, limit), repository.count()]);
    return response.json({ items, total, page, limit });
  }

  async update(request: Request, response: Response) {
    const body = categorySchema.parse(request.body);
    const result = await service.update(request.params.id, body.name);
    return response.json(result);
  }

  async delete(request: Request, response: Response) {
    await service.delete(request.params.id);
    return response.status(204).send();
  }
}
