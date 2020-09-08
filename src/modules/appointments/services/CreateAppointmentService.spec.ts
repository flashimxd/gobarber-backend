import AppError from '@shared/errors/appErrors';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointmentServer: CreateAppointmentService;

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointmentServer = new CreateAppointmentService(
      fakeAppointmentRepository
    );
  });

  it('should create a new appointment', async () => {
    const appointment = await createAppointmentServer.execute({
      provider_id: '13',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('date');
    expect(appointment).toHaveProperty('provider_id');
    expect(appointment.provider_id).toBe('13');
  });

  it('should not be able to create a appointment in the same date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentServer.execute({
      provider_id: '13',
      date: appointmentDate,
    });

    expect(
      createAppointmentServer.execute({
        provider_id: '13',
        date: appointmentDate,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
