// counter-request.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CounterRequest, CounterRequestDocument } from './counter-request.schema';
import { CreateOrUpdateCounterRequestDto } from './dto/request/create.dto';

@Injectable()
export class CounterRequestRepository {
  constructor(@InjectModel(CounterRequest.name) private model: Model<CounterRequestDocument>) {}

  private orThrow<T>(x: T | null | undefined): T {
    if (!x) throw new NotFoundException('NOT_FOUND');
    return x;
  }

  findOneByName = (pathName: string) => this.model.findOne({ pathName }).exec();

  findOneByMethod = (methodUsed: string) => this.model.findOne({ methodUsed }).exec();

  findAll = () => this.model.find();

  createCounterRequest(createCounterRequestDto: CreateOrUpdateCounterRequestDto) {
    return this.model.create({
      pathName: createCounterRequestDto.pathName,
      methodUsed: createCounterRequestDto.methodUsed,
    });
  }

  updateCounterRequest(createOrUpdateCounterRequestDto: CreateOrUpdateCounterRequestDto) {
    return this.findOneByName(createOrUpdateCounterRequestDto.pathName);
  }

  async resetCounter() {
    await this.model.updateMany({}, { $set: { numberOfExecutions: 0, executions: [] } }).exec();
  }

  async deleteExecutionsFromLastHour() {
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);
    await this.model
      .updateMany({ executions: { $elemMatch: { $lte: lastHour } } }, { $pull: { executions: { $lte: lastHour } } })
      .exec();
  }
}
