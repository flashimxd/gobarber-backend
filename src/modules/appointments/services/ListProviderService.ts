import { inject, injectable } from 'tsyringe';
import User from '@modules/user/infra/typeorm/entities/Users';
import IUserRepository from '@modules/user/repositories/IUserRepository';

interface Request {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    const user = await this.userRepository.findAllProviders({
      except_user_id: user_id,
    });

    return user;
  }
}

export default ListProviderService;
