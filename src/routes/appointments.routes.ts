import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns'
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/appointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRoutes = Router();

const appointmentsRepository = new AppointmentsRepository()

appointmentsRoutes.get('/', (request, response) => {
  const appointments = appointmentsRepository.all()

  return response.json(appointments)
})

appointmentsRoutes.post('/', (request, response) => {
  try {
    const { provider, date} = request.body
    const parsedDate = parseISO(date)
    const appointmentDate = startOfHour(parsedDate)
    const createAppointment = new CreateAppointmentService(appointmentsRepository)
    const appointment = createAppointment.execute({provider, date: appointmentDate})

    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({ error: error.message})
  }
});

export default appointmentsRoutes;
