import { Request, Response } from 'express';
import { productSchema } from '../dtos/product.dto';
import { ProductRepository } from '../repositories/product.repository';
import { ProductService } from '../services/product.service';
import { getPagination } from '../utils/pagination';

const service = new ProductService();
const repository = new ProductRepository();

export class ProductController {
  async create(request: Request, response: Response) {
    const body = productSchema.parse(request.body);
    const result = await service.create(body);
    return response.status(201).json(result);
  }

  async list(request: Request, response: Response) {
    const { skip, limit, page } = getPagination(String(request.query.page), String(request.query.limit));
    const [items, total] = await Promise.all([repository.list(skip, limit), repository.count()]);
    return response.json({ items, total, page, limit });
  }

  async update(request: Request, response: Response) {
    const body = productSchema.parse(request.body);
    const result = await service.update(request.params.id, body);
    return response.json(result);
  }

  async delete(request: Request, response: Response) {
    await service.delete(request.params.id);
    return response.status(204).send();
  }
}
