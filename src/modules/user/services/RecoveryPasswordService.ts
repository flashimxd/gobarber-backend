import { inject, injectable } from 'tsyringe';
// import User from '@modules/user/infra/typeorm/entities/Users';
import AppError from '@shared/errors/appErrors';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class RecoveryPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Use does not exist.');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      subject: '[GoBarber] Recuperação de senha.',
      templateData: {
        template: 'Olá {{name}}: {{token}}',
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export default RecoveryPasswordService;
