import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/auth/schemas/user.schema';

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsEmpty({ message: 'You cannot pass user created by id' })
  readonly updatedBy: User;
}
