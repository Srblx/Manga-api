import { Injectable } from '@nestjs/common';
import { CounterRequestDocument } from './counter-request.schema';
import { GetOneCounterRequestDto } from './dto/response/get-counter-request.dto';

@Injectable()
export class CounterRequestMapper {
  constructor() {}

  toGetAllCounterRequestDto = (counterRequests: CounterRequestDocument[]): GetOneCounterRequestDto[] => {
    return counterRequests.map((counterRequest) => {
      return this.toGetCounterRequestDto(counterRequest);
    });
  };

  toGetCounterRequestDto = (counterRequest: CounterRequestDocument): GetOneCounterRequestDto => {
    return {
      id: counterRequest._id,
      pathName: counterRequest.pathName,
      numberOfExecution: counterRequest.executions.length,
      methodUsed: counterRequest.methodUsed,
      createdAt: counterRequest.createdAt,
      updatedAt: counterRequest.updatedAt,
    };
  };
}
