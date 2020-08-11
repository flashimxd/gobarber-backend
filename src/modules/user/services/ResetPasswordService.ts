import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';
import AppErrors from '@shared/errors/appErrors';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
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

    const createdAt = userToken.created_at;
    const compareDate = addHours(createdAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppErrors('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
