import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdateCounterRequestDto {
  @IsNotEmpty()
  @IsString()
  pathName: string;

  @IsNotEmpty()
  @IsString()
  methodUsed: string;
}
