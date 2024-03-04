import { UserRoleEnum } from '../../user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetMeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: UserRoleEnum })
  role: UserRoleEnum;
}
