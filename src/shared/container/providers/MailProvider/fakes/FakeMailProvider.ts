import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class FakeMailprovider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(messages: ISendMailDTO): Promise<void> {
    this.messages.push(messages);
  }
}
