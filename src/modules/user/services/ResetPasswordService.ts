import { inject, injectable } from 'tsyringe';
// import User from '@modules/user/infra/typeorm/entities/Users';
import AppErrors from '@shared/errors/appErrors';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppErrors('Invalid user token.');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppErrors('User not found.');
    }

    user.password = password;

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
