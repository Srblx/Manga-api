import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoleEnum } from '../../user-role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'fcartozo@dev-id.fr' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsEnum(UserRoleEnum) 
  role: UserRoleEnum;
}
