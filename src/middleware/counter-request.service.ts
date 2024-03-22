// counter-request.service.ts
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CounterRequestGateway } from './counter-request.gateway';
import { CounterRequestMapper } from './counter-request.mapper';
import { CounterRequestRepository } from './counter-request.repository';
import { CreateOrUpdateCounterRequestDto } from './dto/request/create.dto';

@Injectable()
export class CounterRequestService {
  private readonly logger = new Logger(CounterRequestService.name);
  constructor(
    private readonly counterRequestRepository: CounterRequestRepository,
    private readonly counterRequestMapper: CounterRequestMapper,
    private readonly counterRequestGateway: CounterRequestGateway,
  ) {}

  async createOrUpdateCounterRequest(createOrUpdateCounterRequestDto: CreateOrUpdateCounterRequestDto) {
    const { pathName, methodUsed } = createOrUpdateCounterRequestDto;
    const existingPathNameCounterRequest = await this.counterRequestRepository.findOneByName(pathName);
    const existingMethodUsedCounterRequest = await this.counterRequestRepository.findOneByMethod(methodUsed);

    if (existingPathNameCounterRequest && existingMethodUsedCounterRequest) {
      existingPathNameCounterRequest.executions.push(new Date());
      existingPathNameCounterRequest.numberOfExecutions = existingPathNameCounterRequest.executions.length;
      await existingPathNameCounterRequest.save();
      return this.counterRequestMapper.toGetCounterRequestDto(existingPathNameCounterRequest);
    } else {
      const createdCounterRequest = await this.counterRequestRepository.createCounterRequest({ pathName, methodUsed });
      return this.counterRequestMapper.toGetCounterRequestDto(createdCounterRequest);
    }
  }

  async getCounterRequests() {
    const CounterRequest = await this.counterRequestRepository.findAll();
    return this.counterRequestMapper.toGetAllCounterRequestDto(CounterRequest);
  }

  async getCounterRequest(pathName: string) {
    const CounterRequest = await this.counterRequestRepository.findOneByName(pathName);
    if (!CounterRequest) throw new BadRequestException('NOT_FOUND_CounterRequest');
    return this.counterRequestMapper.toGetCounterRequestDto(CounterRequest);
  }

  async getCounterRequestsInLastHour() {
    const counterRequests = await this.counterRequestRepository.findAll();
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    let totalExecutionsInLastHour = 0;
    for (const counterRequest of counterRequests) {
      counterRequest.executions.forEach((executionTime) => {
        if (executionTime >= oneHourAgo && executionTime <= now) {
          totalExecutionsInLastHour++;
        }
      });
    }
    return totalExecutionsInLastHour;
  }

  @Cron(CronExpression.EVERY_HOUR)
  async resetCounter() {
    this.logger.debug('Reset counter of execution ...');
    await this.counterRequestRepository.deleteExecutionsFromLastHour();
    await this.updateNumberOfExecutions();
  }

  private async updateNumberOfExecutions() {
    const counterRequests = await this.counterRequestRepository.findAll();
    for (const counterRequest of counterRequests) {
      counterRequest.numberOfExecutions = counterRequest.executions.length;
      await counterRequest.save();
    }
  }

  async handleCounterRequest(requestData: number) {
    this.counterRequestGateway.server.emit('counterRequest', requestData);
    return requestData;
  }
}
