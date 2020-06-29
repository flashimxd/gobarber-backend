import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/appointmentsRepository';
import AppError from '../errors/appErrors';

interface Request {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      date
    );
    const appointmentDate = startOfHour(date);

    if (findAppointmentInSameDate) throw new AppError('Date has been taken');

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
