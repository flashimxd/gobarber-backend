import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ResetPasswordService from '@modules/user/services/ResetPasswordService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;
    const resetPassword = container.resolve(ResetPasswordService);
    await resetPassword.execute({
      password,
      token,
    });

    return response.status(204).json();
  }
}