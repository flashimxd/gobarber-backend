import FakeUserRepository from '@modules/user/repositories/fakes/FakeUserRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListProviderService from './ListProviderService';

let fakeUserRepository: FakeUserRepository;
let listProvider: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('List providers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvider = new ListProviderService(
      fakeUserRepository,
      fakeCacheProvider
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
