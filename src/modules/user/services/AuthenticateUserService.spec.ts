import AppErrors from '@shared/errors/appErrors';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserServer from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserServer: CreateUserServer;
let authenticateUserServer: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserServer = new CreateUserServer(
      fakeUserRepository,
      fakeHashProvider
    );
    authenticateUserServer = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
  });
  it('should authenticate', async () => {
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
    expect(
      authenticateUserServer.execute({
        email: 'rangel@galo.com',
        password: '1313',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should not be able to authenticate with an incorrect password', async () => {
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
