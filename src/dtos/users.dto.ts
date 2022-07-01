import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;
}

export class LoginUserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
