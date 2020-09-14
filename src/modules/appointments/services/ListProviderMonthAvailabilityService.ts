import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';
// import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
// import AppError from '@shared/errors/appErrors';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      }
    );

    const numberOfDaysInMounth = getDaysInMonth(new Date(year, month - 1));
    const eachDayArray = Array.from(
      { length: numberOfDaysInMounth },
      (_, index) => index + 1
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
