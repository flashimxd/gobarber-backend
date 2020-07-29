import { inject, injectable } from 'tsyringe';
import User from '@modules/user/infra/typeorm/entities/Users';
import AppError from '@shared/errors/appErrors';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkIfUserExist = await this.userRepository.findByEmail(email);

    if (checkIfUserExist) {
      throw new AppError('Email address already been used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
