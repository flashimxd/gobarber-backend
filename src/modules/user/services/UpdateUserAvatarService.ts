import fs from 'fs';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import UploadConfig from '@config/upload';
import User from '@modules/user/infra/typeorm/entities/Users';
import AppError from '@shared/errors/appErrors';
import IStorageProvide from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserRepository from '../repositories/IUserRepository';

interface Request {
  user_id: string;
  fileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvide
  ) {}

  public async execute({ user_id, fileName }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new AppError('Invalid user', 401);

    if (user.avatar) {
      await this.storageProvider.deleteFile(fileName);
    }

    const file = await this.storageProvider.saveFile(fileName);

    user.avatar = file;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
