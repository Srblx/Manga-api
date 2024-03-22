import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Protect } from 'src/auth/_utils/decorator/protect.decorator';
import { CounterRequestService } from './counter-request.service';
import { CounterRequestDto } from './dto/request/counter-request.dto';
import { CreateOrUpdateCounterRequestDto } from './dto/request/create.dto';
import { HandleCounterRequestDto } from './dto/request/handle-counter-request.dto';

@Controller('counterRequest')
export class CounterRequestController {
  private readonly logger = new Logger(CounterRequestService.name);
  constructor(private readonly counterRequestService: CounterRequestService) {}

  @Protect()
  @Get()
  @ApiOkResponse({ description: 'SUCCES', type: [CounterRequestDto] })
  getCounterRequests() {
    return this.counterRequestService.getCounterRequests();
  }

  @Get(':pathName')
  @ApiOkResponse({ description: 'SUCCES', type: CounterRequestDto })
  getCounterRequest(@Param() pathName: string) {
    return this.counterRequestService.getCounterRequest(pathName);
  }

  @Protect()
  @Post()
  createCounterRequest(@Body() createMidddlewareDto: CreateOrUpdateCounterRequestDto) {
    return this.counterRequestService.createOrUpdateCounterRequest(createMidddlewareDto);
  }

  @Post('ws')
  async handleCounterRequest(@Body() handleCounterRequestDto: HandleCounterRequestDto) {
    await this.counterRequestService.handleCounterRequest(handleCounterRequestDto.numberOfExecution);
    return handleCounterRequestDto.numberOfExecution;
  }
}
