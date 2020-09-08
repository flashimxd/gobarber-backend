import { inject, injectable } from 'tsyringe';
import User from '@modules/user/infra/typeorm/entities/Users';
import AppError from '@shared/errors/appErrors';
import IHashProvide from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvide
  ) {}

  public async execute({ user_id, name, email }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default UpdateProfileService;
