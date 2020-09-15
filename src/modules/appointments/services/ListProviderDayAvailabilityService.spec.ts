// import AppError from '@shared/errors/appErrors';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository
    );
  });

  it('should be able to list the day avalaibility from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      user_id: '14',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      user_id: '14',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const avalaibility = await listProviderDayAvailability.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(avalaibility).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
        { hour: 17, available: true },
      ])
    );
  });
});
