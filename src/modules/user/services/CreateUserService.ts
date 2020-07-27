import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import User from '@modules/user/infra/typeorm/entities/Users';
import AppError from '@shared/errors/appErrors';
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
    private userRepository: IUserRepository
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkIfUserExist = await this.userRepository.findByEmail(email);

    if (checkIfUserExist) throw new AppError('Email address already been used');

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
