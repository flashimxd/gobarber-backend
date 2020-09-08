import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
// import AppErrors from '@shared/errors/appErrors';
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
});
