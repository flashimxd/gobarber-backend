import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/appErrors';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  constructor(private appointmentRepository: IAppointmentsRepository) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      date
    );
    const appointmentDate = startOfHour(date);

    if (findAppointmentInSameDate) throw new AppError('Date has been taken');

    const appointment = this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
