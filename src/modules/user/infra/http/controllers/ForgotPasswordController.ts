import { container } from 'tsyringe';
import { Request, Response } from 'express';
import RecoveryPasswordService from '@modules/user/services/RecoveryPasswordService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const recoveryPassword = container.resolve(RecoveryPasswordService);
    await recoveryPassword.execute({
      email,
    });

    return response.status(204).json();
  }
}
