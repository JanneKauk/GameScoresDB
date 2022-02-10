import { Injectable, NotFoundException } from "@nestjs/common";
import { GamesRepository } from "./games.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "./game.entity";
import { CreateGameDto } from "./dto/create-game.dto";
import { GetGamesFilterDto } from "./dto/get-games-filter.dto";
import { Platform } from "./dao/platform.entity";
import { PlatformsRepository } from "./dao/platforms.repository";
import { getConnection } from "typeorm";

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GamesRepository)
    private gamesRepository: GamesRepository,
    @InjectRepository(PlatformsRepository)
    private platformsRepository: PlatformsRepository,
  ) {
  }

  getGames(filterDto: GetGamesFilterDto): Promise<Game[]> {
    return this.gamesRepository.getGames(filterDto);
  }

  async createGame(createGameDto: CreateGameDto, platformId: number): Promise<Game> {
    const { title, Description, ReleaseDate, imagesId} = createGameDto;

    const game = this.gamesRepository.create({
      title,
      Description,
      ReleaseDate,
      imagesId,
    });
    const savedGame = await this.gamesRepository.save(game);
    await getConnection()
      .createQueryBuilder()
      .relation(Game, "platforms")
      .of(savedGame)
      .add(platformId)

    return game;
  }

  async getGameById(id: number): Promise<Game> {
    const found = await this.gamesRepository.findOne(id);

    if(!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async getGamePlatforms(): Promise<Platform> {
    const found = await this.platformsRepository.findOne(1);

    if(!found) {
      throw new NotFoundException();
    }
    return found;
  }

    async deleteGameById(id: number): Promise<void> {
      const result = await this.gamesRepository.delete(id);
      if(result.affected === 0) {
        throw new NotFoundException("Game not found");
      }

    }

  async updateGameTitle(id: number, title: string): Promise<Game> {
    const game = await this.getGameById(id);
    game.title = title;
    await this.gamesRepository.save(game);

    return game;
  }
}
