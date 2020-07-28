import CreateAppointmentServer from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('Create Appointment', () => {
  it('should create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentServer = new CreateAppointmentServer(
      fakeAppointmentRepository
    );

    const appointment = await createAppointmentServer.execute({
      provider_id: '13',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('date');
    expect(appointment).toHaveProperty('provider_id');
    expect(appointment.provider_id).toBe('13');
  });
});
