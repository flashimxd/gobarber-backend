import { inject, injectable } from 'tsyringe';
import User from '@modules/user/infra/typeorm/entities/Users';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id }: Request): Promise<User[]> {
    let users = await this.cacheProvider.get<User[]>(
      `providers-list:${user_id}`
    );

    if (!users) {
      users = await this.userRepository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheProvider.save(`providers-list:${user_id}`, users);
    }

    return users;
  }
}

export default ListProviderService;
