import AppError from '@shared/errors/appErrors';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointmentServer: CreateAppointmentService;

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointmentServer = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository
    );
  });

  it('should create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 11).getTime();
    });
    const appointment = await createAppointmentServer.execute({
      provider_id: '13',
      user_id: '14',
      date: new Date(2020, 4, 10, 12),
    });

    expect(appointment).toHaveProperty('date');
    expect(appointment).toHaveProperty('provider_id');
    expect(appointment.provider_id).toBe('13');
  });

  it('should not be able to create a appointment in the same date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentServer.execute({
      provider_id: '13',
      user_id: '14',
      date: appointmentDate,
    });

    await expect(
      createAppointmentServer.execute({
        provider_id: '13',
        user_id: '14',
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 11).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 10);

    await expect(
      createAppointmentServer.execute({
        provider_id: '13',
        user_id: '14',
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment with a user being provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 11).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 12);

    await expect(
      createAppointmentServer.execute({
        provider_id: '14',
        user_id: '14',
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a appointment out of the working hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 6).getTime();
    });

    await expect(
      createAppointmentServer.execute({
        provider_id: '15',
        user_id: '14',
        date: new Date(2020, 4, 10, 7),
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentServer.execute({
        provider_id: '15',
        user_id: '14',
        date: new Date(2020, 4, 10, 18),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
