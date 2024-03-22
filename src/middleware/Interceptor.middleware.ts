import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CounterRequestService } from './counter-request.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly counterRequestService: CounterRequestService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      tap(async () => {
        const { originalUrl, method } = req;
        const basePath = originalUrl.split('/').slice(0, 4).join('/');
        this.counterRequestService.createOrUpdateCounterRequest({ pathName: basePath, methodUsed: method });
        const numberOfExecutionInLastHour = this.counterRequestService.getCounterRequestsInLastHour();
        this.counterRequestService.handleCounterRequest(await numberOfExecutionInLastHour);
      }),
    );
  }
}
