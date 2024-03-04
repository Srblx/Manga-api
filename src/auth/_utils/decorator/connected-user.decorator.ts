import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ConnectedUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);