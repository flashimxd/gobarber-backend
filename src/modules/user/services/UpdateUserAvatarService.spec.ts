import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppErrors from '@shared/errors/appErrors';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('Update User Avatar', () => {
  it('should update the use avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );

    const user = await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      fileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update the use avatar from a non existing Use', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );

    expect(
      updateUserAvatarService.execute({
        user_id: '1',
        fileName: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppErrors);
  });

  it('should delete the previous avatar file', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );

    const user = await fakeUserRepository.create({
      name: 'Rangel Galo',
      email: 'rangel@galo.com',
      password: '1313',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      fileName: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      fileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
