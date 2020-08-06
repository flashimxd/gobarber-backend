import AppErrors from '@shared/errors/appErrors';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import RecoveryPasswordService from './RecoveryPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let recoveryPasswordService: RecoveryPasswordService;

describe('Recovery Password', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    recoveryPasswordService = new RecoveryPasswordService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  });

  it('should be able to recovery a password using an email', async () => {
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

  it('should not be able to recovery a password using an email for a non-existing user', async () => {
    await expect(
      recoveryPasswordService.execute({
        email: 'rangel@galo.com',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should be able to create a token to email recovery', async () => {
    const sendToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    await recoveryPasswordService.execute({
      email: 'rangel@galo.com',
    });

    expect(sendToken).toHaveBeenCalledWith(user.id);
  });
});
