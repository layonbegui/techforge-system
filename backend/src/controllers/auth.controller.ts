import { Request, Response } from 'express';
import { loginSchema } from '../dtos/user.dto';
import { AuthService } from '../services/auth.service';

const service = new AuthService();

export class AuthController {
  async login(request: Request, response: Response) {
    const body = loginSchema.parse(request.body);
    const result = await service.login(body.email, body.password);
    return response.json(result);
  }
}
