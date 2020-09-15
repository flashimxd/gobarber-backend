import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;
    console.log('index month ava');
    // git adconsole.log({ request });
    console.log('body', request.body);
    console.log('params', request.params);
    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService
    );

    const providers = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month,
      year,
    });

    return response.json(providers);
  }
}
