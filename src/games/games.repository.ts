import { EntityRepository, Repository } from "typeorm";
import { gamelistitem } from "./game.entity";
import { GetGamesFilterDto } from "./dto/get-games-filter.dto";

@EntityRepository(gamelistitem) // Repository of entity Game
export class GamesRepository extends Repository<gamelistitem> {
  async getGames(filterDto: GetGamesFilterDto): Promise<gamelistitem[]> {
    const { search } = filterDto;

    const query = this.createQueryBuilder('gamelistitem');

    if (search) {
      query.andWhere('gamelistitem.title LIKE :search OR gamelistitem.Description LIKE :search ', { search: `%${search}%` });
    }

    return await query.getMany();
  }
}