import { container } from 'tsyringe';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/appointmentsRepository';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

import '@modules/user/providers';
import './providers';

import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';

import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import UserTokensRepository from '@modules/user/infra/typeorm/repositories/UserTokensRepository';
import IUserTokensRepository from '@modules/user/repositories/IUserTokensRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
);
