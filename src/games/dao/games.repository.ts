import { EntityRepository, Repository } from "typeorm";
import { Game } from "./game.entity";
import { GetGamesFilterDto } from "../dto/get-games-filter.dto";

@EntityRepository(Game) // Repository of entity Game
export class GamesRepository extends Repository<Game> {
  async getGames(filterDto: GetGamesFilterDto): Promise<Game[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('game');

    if (search) {
      query.
          leftJoinAndSelect("game.platforms", "platform")
        .leftJoinAndSelect("game.images", "images")
        .leftJoinAndSelect("game.genres", "genres")
        .leftJoinAndSelect("game.trailer", "trailer")
        .where('game.title LIKE :search OR game.Description LIKE :search ', { search: `%${search}%` });
    }
    console.log(query.getMany());

    return await query.getMany();
  }
}