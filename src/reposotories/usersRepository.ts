import User from '../models/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
    public async findByUserId(id: string): Promise<User | undefined> {

        const user = await this.findOne(id);

        return user;
    }
}

export default UsersRepository