import { model, Schema, Document } from 'mongoose';
import { IUser, RoleSystem } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: RoleSystem,
    required: true,
    default: RoleSystem.NORMAL,
  },
});

const userModel = model<IUser & Document>('User', userSchema);

export default userModel;
