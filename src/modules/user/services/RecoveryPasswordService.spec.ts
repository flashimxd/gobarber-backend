// import AppErrors from '@shared/errors/appErrors';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import RecoveryPasswordService from './RecoveryPasswordService';

describe('Recovery Password', () => {
  it('should be able to recovery a password using an email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const recoveryPasswordService = new RecoveryPasswordService(
      fakeUserRepository,
      fakeMailProvider
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    await recoveryPasswordService.execute({
      email: 'rangel@galo.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
