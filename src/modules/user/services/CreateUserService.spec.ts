import AppErrors from '@shared/errors/appErrors';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserServer from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserServer: CreateUserServer;
let fakeCacheProvider: FakeCacheProvider;

describe('Create User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserServer = new CreateUserServer(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('should create a new User', async () => {
    const user = await createUserServer.execute({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new User with an email alredy in use', async () => {
    await createUserServer.execute({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    await expect(
      createUserServer.execute({
        name: 'Rangel Galo',
        email: 'rangel@galo.com',
        password: '1313',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
