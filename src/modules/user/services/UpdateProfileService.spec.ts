import AppErrors from '@shared/errors/appErrors';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfileService: UpdateUserProfileService;

describe('Update User Profile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfileService = new UpdateUserProfileService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it('should update the user data', async () => {
    const user = await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    const updatedUser = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'Rangel Galo Doido',
      email: 'rangel2@galo.com',
    });

    expect(updatedUser.name).toBe('Rangel Galo Doido');
    expect(updatedUser.email).toBe('rangel2@galo.com');
  });

  it('should not be able to update the user email to one alredy in use', async () => {
    await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    const user = await fakeUserRepository.create({
      name: 'Rangel Galo 2',
      email: 'rangel2@galo.com',
      password: '1313',
    });

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Rangel Galo Doido',
        email: 'rangel@galo.com',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should be able to update the pasword', async () => {
    const user = await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'Rangel Galo Doido',
      email: 'rangel2@galo.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the pasword without pass the old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '123456',
    });

    expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Rangel Galo Doido',
        email: 'rangel2@galo.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able to update the pasword passing a wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '123456',
    });

    expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Rangel Galo Doido',
        email: 'rangel2@galo.com',
        old_password: '123123',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able to update the profile from non-existing user', async () => {
    expect(
      updateUserProfileService.execute({
        user_id: 'not-existing-id',
        email: 'teste@email.com',
        name: 'test',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
