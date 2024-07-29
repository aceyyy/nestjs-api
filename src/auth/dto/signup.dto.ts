import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString() 
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
