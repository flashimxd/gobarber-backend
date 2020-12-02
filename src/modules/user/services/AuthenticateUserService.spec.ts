import AppErrors from '@shared/errors/appErrors';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserServer from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserServer: CreateUserServer;
let authenticateUserServer: AuthenticateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserServer = new CreateUserServer(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
    authenticateUserServer = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
  });
  it('should authenticate', async () => {
    await fakeUserRepository.create({
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
    await fakeUserRepository.create({
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
