import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/appErrors';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}
@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (provider_id === user_id) {
      throw new AppError(
        'Cannot create an appointment to an user being a provider.'
      );
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('Cannot create an appointment in a past date.');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'Cannot create an appointment outside the working hours schedule.'
      );
    }

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      date
    );

    if (findAppointmentInSameDate) {
      throw new AppError('Date has been taken');
    }

    const appointment = this.appointmentRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
