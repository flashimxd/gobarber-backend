import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/user/infra/typeorm/entities/Users';
import AppError from '@shared/errors/appErrors';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkIfUserExist = await userRepository.findOne({
      where: { email },
    });

    if (checkIfUserExist) throw new AppError('Email address already been used');

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
