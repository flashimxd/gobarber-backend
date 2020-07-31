import { inject, injectable } from 'tsyringe';
// import User from '@modules/user/infra/typeorm/entities/Users';
// import AppError from '@shared/errors/appErrors';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  email: string;
}

@injectable()
class RecoveryPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(email, 'Sending a email');
  }
}

export default RecoveryPasswordService;
