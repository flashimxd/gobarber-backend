import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';

import UserController from '../controllers/UserControllers';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRoutes = Router();
const upload = multer(uploadConfig);
const userController = new UserController();
const userAvatarController = new UserAvatarController();

usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create
);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
);

export default usersRoutes;
