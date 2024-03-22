import { IsNumber } from 'class-validator';

export class HandleCounterRequestDto {
  @IsNumber()
  numberOfExecution: number;
}
