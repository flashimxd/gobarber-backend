import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentRepository
    );
  });

  it('should be able to list a appointment from a specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      user_id: '14',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      user_id: '14',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
