import AppErrors from '@shared/errors/appErrors';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserServer from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('Create User', () => {
  it('should create a new User', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserServer = new CreateUserServer(
      fakeUserRepository,
      fakeHashProvider
    );

    const user = await createUserServer.execute({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new User with an email alredy in use', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserServer = new CreateUserServer(
      fakeUserRepository,
      fakeHashProvider
    );

    await createUserServer.execute({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    expect(
      createUserServer.execute({
        name: 'Rangel Galo',
        email: 'rangel@galo.com',
        password: '1313',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
