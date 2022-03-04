import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "../games/dao/users.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
