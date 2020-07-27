import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '@modules/user/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateuserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateuserAvatar.execute({
      user_id: request.user.id,
      fileName: request.file.filename,
    });

    delete user.password;
    return response.json(user);
  }
}
