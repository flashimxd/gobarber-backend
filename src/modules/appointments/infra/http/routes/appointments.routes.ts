import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentsRoutes.use(ensureAuthenticated);

// appointmentsRoutes.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const appointmentDate = startOfHour(parsedDate);
  const createAppointment = new CreateAppointmentService(appointmentRepository);
  const appointment = await createAppointment.execute({
    provider_id,
    date: appointmentDate,
  });

  return response.json(appointment);
});

export default appointmentsRoutes;
