// import AppError from '@shared/errors/appErrors';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository
    );
  });

  it('should be able to list the month avalaibility from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const avalaibility = await listProviderMonthAvailability.execute({
      provider_id: 'provider_id',
      year: 2020,
      month: 5,
    });

    expect(avalaibility).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: true },
      ])
    );
  });
});
