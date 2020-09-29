import { ObjectID } from 'mongodb';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    recipent_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), recipent_id, content });
    // notification.id = new ObjectID();
    // notification.recipent_id = recipent_id;
    // notification.content = content;

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
