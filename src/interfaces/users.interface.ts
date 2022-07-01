export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: RoleSystem;
}

export enum RoleSystem {
  SYSTEM = 0,
  NORMAL = 1,
}
