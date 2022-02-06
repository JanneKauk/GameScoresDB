import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { GamesRepository } from "./games.repository";
import { ImagesRepository } from "./images.repository";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([GamesRepository, ImagesRepository]),
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
