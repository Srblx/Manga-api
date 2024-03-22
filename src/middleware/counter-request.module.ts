import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CounterRequestController } from './counter-request.controller';
import { CounterRequestGateway } from './counter-request.gateway';
import { CounterRequestMapper } from './counter-request.mapper';
import { CounterRequestRepository } from './counter-request.repository';
import { CounterRequest, CounterRequestSchema } from './counter-request.schema';
import { CounterRequestService } from './counter-request.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CounterRequest.name, schema: CounterRequestSchema }])],
  controllers: [CounterRequestController],
  providers: [CounterRequestRepository, CounterRequestMapper, CounterRequestService, CounterRequestGateway],
})
export class CounterRequestModule {}
