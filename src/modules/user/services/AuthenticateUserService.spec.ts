import AppErrors from '@shared/errors/appErrors';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserServer from './CreateUserService';
import AuthenticateUserServer from './AuthenticateUserService';

describe('Authenticate User', () => {
  it('should authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserServer = new CreateUserServer(
      fakeUserRepository,
      fakeHashProvider
    );
    const authenticateUserServer = new AuthenticateUserServer(
      fakeUserRepository,
      fakeHashProvider
    );

    await createUserServer.execute({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    const response = await authenticateUserServer.execute({
      email: 'rangel@galo.com',
      password: '1313',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserServer = new AuthenticateUserServer(
      fakeUserRepository,
      fakeHashProvider
    );

    expect(
      authenticateUserServer.execute({
        email: 'rangel@galo.com',
        password: '1313',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able to authenticate with an incorrect password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserServer = new CreateUserServer(
      fakeUserRepository,
      fakeHashProvider
    );
    const authenticateUserServer = new AuthenticateUserServer(
      fakeUserRepository,
      fakeHashProvider
    );

    await createUserServer.execute({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    expect(
      authenticateUserServer.execute({
        email: 'rangel@galo.com',
        password: 'galodoido',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
