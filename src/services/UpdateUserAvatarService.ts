import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';
import UploadConfig from '../config/upload';
import User from '../models/Users';
import AppError from '../errors/appErrors';

interface Request {
  user_id: string;
  fileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, fileName }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);

    if (!user) throw new AppError('Invalid user', 401);

    if (user.avatar) {
      const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = fileName;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
