import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/appointmentsRepository'
import AppointmentRepository from '../repositories/appointmentsRepository';
import { startOfHour } from 'date-fns'

interface Request {
  provider: string;
  date: Date;
}
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository

  constructor(appointmentsRepository: AppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date}: Request): Appointment {
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(date)
    const appointmentDate = startOfHour(date)

    if(findAppointmentInSameDate)
      throw Error('Date has been taken')

    const appointment = this.appointmentsRepository.create({provider, date: appointmentDate})
    return appointment
  }
}

export default CreateAppointmentService;
