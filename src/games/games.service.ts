import { Injectable, NotFoundException } from "@nestjs/common";
import { GamesRepository } from "./games.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { gamelistitem } from "./game.entity";
import { CreateGameDto } from "./dto/create-game.dto";
import { GetGamesFilterDto } from "./dto/get-games-filter.dto";

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GamesRepository)
    private gamesRepository: GamesRepository,
  ) {
  }

  getGames(filterDto: GetGamesFilterDto): Promise<gamelistitem[]> {
    return this.gamesRepository.getGames(filterDto);
  }

  async createGame(createGameDto: CreateGameDto): Promise<gamelistitem> {
    const {title, platforms, Description, imageUrl, OverallScore} = createGameDto;

    const gameListItem = this.gamesRepository.create({
      title,
      platforms,
      imageUrl,
      Description,
      OverallScore,
    });
    await this.gamesRepository.save(gameListItem);

    return gameListItem;
  }

  async getGameById(id: number): Promise<gamelistitem> {
    const found = await this.gamesRepository.findOne(id);

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

  async updateGameTitle(id: number, title: string): Promise<gamelistitem> {
    const game = await this.getGameById(id);
    game.title = title;
    await this.gamesRepository.save(game);

    return game;
  }
}
