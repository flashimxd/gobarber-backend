import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreateUserService from '@modules/user/services/CreateUserService';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/user/services/UpdateUserAvatarService';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateuserAvatar = new UpdateUserAvatarService();

    const user = await updateuserAvatar.execute({
      user_id: request.user.id,
      fileName: request.file.filename,
    });

    delete user.password;
    return response.json(user);
  }
);

export default usersRoutes;
