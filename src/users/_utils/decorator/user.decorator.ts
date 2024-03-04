import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((params: { showEndedSub?: boolean }, ctx: ExecutionContext) => {
  const user = ctx.switchToHttp().getRequest().user;
  if (!user) return null;

  return user;
});
