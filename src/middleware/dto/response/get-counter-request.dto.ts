import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class GetOneCounterRequestDto {
  @ApiProperty()
  id: string | Types.ObjectId;

  @ApiProperty()
  pathName: string;

  @ApiProperty()
  numberOfExecution: number;

  @ApiProperty()
  methodUsed: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
