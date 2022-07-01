import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { IUser, RoleSystem } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<IUser[]> {
    const users: IUser[] = await this.users.find();
    return users;
  }
  public async findUserById(userId: string): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: IUser = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser: IUser = await this.users.findOne({ username: userData.username });
    if (findUser) throw new HttpException(409, `You're email ${userData.username} already exists`);
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: IUser = await this.users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (userData.username) {
      const findUser: IUser = await this.users.findOne({ email: userData.username });
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.username} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: IUser = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "You're not user");

    return updateUserById;
  }

  public async deleteUser(userId: string, user: IUser): Promise<IUser> {
    const findUser = await this.users.findById({
      _id: userId,
    });
    if (findUser.role === RoleSystem.SYSTEM) {
      throw new HttpException(400, 'This user cant not delete');
    }
    if (findUser.role === RoleSystem.NORMAL && user.role !== RoleSystem.SYSTEM) {
      throw new HttpException(400, 'You have not enough permission');
    }
    const deleteUserById: IUser = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");
    return deleteUserById;
  }
}

export default UserService;
