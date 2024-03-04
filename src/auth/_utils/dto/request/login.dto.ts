import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'fcartozo@dev-id.fr' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
