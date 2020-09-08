import AppErrors from '@shared/errors/appErrors';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserServer from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserServer: CreateUserServer;

describe('Create User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserServer = new CreateUserServer(
      fakeUserRepository,
      fakeHashProvider
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

    expect(
      createUserServer.execute({
        name: 'Rangel Galo',
        email: 'rangel@galo.com',
        password: '1313',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });
});
