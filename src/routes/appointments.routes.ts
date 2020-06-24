import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/appointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRoutes = Router();

appointmentsRoutes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRoutes.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);
    const appointmentDate = startOfHour(parsedDate);
    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({
      provider_id,
      date: appointmentDate,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRoutes;