import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import UploadConfig from '@config/upload';
import User from '@modules/user/infra/typeorm/entities/Users';
import AppError from '@shared/errors/appErrors';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  user_id: string;
  fileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ user_id, fileName }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new AppError('Invalid user', 401);

    if (user.avatar) {
      const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = fileName;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
