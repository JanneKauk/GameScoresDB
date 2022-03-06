import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Users } from "../games/dao/users.entity";

export const GetUser = createParamDecorator((_data, context: ExecutionContext): Users => {
  const req = context.switchToHttp().getRequest();
  return req.user;
});