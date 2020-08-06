import { uuid } from 'uuidv4';
import IUserTokensRepository from '@modules/user/repositories/IUserTokensRepository';
import UserToken from '@modules/user/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    // Object.assign(userToken, {
    //   id: uuid(),
    //   token: uuid(),
    //   user_id,
    // });
    const newuserToken = { ...userToken, id: uuid(), token: uuid(), user_id };

    this.userTokens.push(newuserToken);

    return newuserToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token
    );

    return userToken;
  }
}

export default FakeUserTokensRepository;
