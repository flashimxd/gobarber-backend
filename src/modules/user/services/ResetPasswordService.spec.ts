import AppErrors from '@shared/errors/appErrors';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('Reset Password', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository
    );
  });

  it('should be able to reset a password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);
    // console.log({ token });
    await resetPasswordService.execute({
      password: '1234',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe('1234');
  });
});
