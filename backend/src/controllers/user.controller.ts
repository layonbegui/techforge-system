import { Request, Response } from 'express';
import { createUserSchema, updateUserSchema } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

const service = new UserService();

export class UserController {
  async create(request: Request, response: Response) {
    const body = createUserSchema.parse(request.body);
    const result = await service.create(body);
    return response.status(201).json(result);
  }

  async me(request: Request, response: Response) {
    const result = await service.getOwn(String(request.userId));
    return response.json(result);
  }

  async updateMe(request: Request, response: Response) {
    const body = updateUserSchema.parse(request.body);
    const result = await service.updateOwn(String(request.userId), body);
    return response.json(result);
  }
}
