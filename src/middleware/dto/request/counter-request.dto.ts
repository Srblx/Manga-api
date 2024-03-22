import { IsString } from 'class-validator';

export class CounterRequestDto {
  @IsString()
  pathName: string;
}
