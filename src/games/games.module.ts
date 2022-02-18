import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { GamesRepository } from "./dao/games.repository";
import { ImagesRepository } from "./dao/images.repository";
import { ConfigModule } from "@nestjs/config";
import { PlatformsRepository } from "./dao/platforms.repository";
import { GenreRepository } from "./dao/genre.repository";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([GamesRepository, ImagesRepository, PlatformsRepository, GenreRepository]),
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
