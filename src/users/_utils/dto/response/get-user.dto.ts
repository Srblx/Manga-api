import { Types } from 'mongoose';
import { UserRoleEnum } from '../../user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty()
  id: string | Types.ObjectId;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: UserRoleEnum })
  role: UserRoleEnum;
}
