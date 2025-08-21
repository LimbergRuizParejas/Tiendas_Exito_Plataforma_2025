import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(4)
  password!: string;
}
