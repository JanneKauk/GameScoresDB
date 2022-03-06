import { Module } from "@nestjs/common";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GamesRepository } from "./dao/games.repository";
import { ImagesRepository } from "./dao/images.repository";
import { ConfigModule } from "@nestjs/config";
import { PlatformsRepository } from "./dao/platforms.repository";
import { GenreRepository } from "./dao/genre.repository";
import { TrailerRepository } from "./dao/trailer.repository";
import { ReviewRepository } from "./dao/review.repository";
import { UsersRepository } from "./dao/users.repository";
import { AuthenticationModule } from "../authentication/authentication.module";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([GamesRepository,
      ImagesRepository,
      PlatformsRepository,
      GenreRepository,
      TrailerRepository,
      ReviewRepository,
      UsersRepository
    ]),
    AuthenticationModule,
  ],
  controllers: [GamesController],
  providers: [GamesService]
})
export class GamesModule {
}
