import { Injectable, NotFoundException } from "@nestjs/common";
import { GamesRepository } from "./dao/games.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "./dao/game.entity";
import { CreateGameDto } from "./dto/create-game.dto";
import { GetGamesFilterDto } from "./dto/get-games-filter.dto";
import { Platform } from "./dao/platform.entity";
import { PlatformsRepository } from "./dao/platforms.repository";
import { getConnection } from "typeorm";
import { ReviewRepository } from "./dao/review.repository";
import { Review } from "./dao/review.entity";
import { UsersRepository } from "./dao/users.repository";
import { ReviewsDto } from "./dto/reviews.dto";

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GamesRepository)
    private gamesRepository: GamesRepository,
    @InjectRepository(PlatformsRepository)
    private platformsRepository: PlatformsRepository,
    @InjectRepository(ReviewRepository)
    private reviewRepository: ReviewRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository
  ) {
  }

  getGames(filterDto: GetGamesFilterDto): Promise<Game[]> {
    return this.gamesRepository.getGames(filterDto);
  }

  async getGameCount(): Promise<number>{
    const count = await this.gamesRepository.createQueryBuilder("game")
      .select("*", "count").getCount();
    console.log("DB log for count:"+count);
    return count
  }

  async getGamesWithEverything(page): Promise<Game[]> {
    const to = 20*page
    const from = to-19
    // const gamesWithPlatforms = await connection.getRepository()
    const test = await this.gamesRepository.createQueryBuilder("game")
      .leftJoinAndSelect("game.platforms", "platform")
      .leftJoinAndSelect("game.images", "images")
      .leftJoinAndSelect("game.genres", "genres")
      .leftJoinAndSelect("game.trailer", "trailer").where("game.Id >= :from and game.Id <= :to", {from, to})
      .getMany();

      console.log(await this.reviewRepository.createQueryBuilder().getMany())
      console.log(test);

    return  test;
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
    // const found = await this.gamesRepository.findOne(id);
    const found = await this.gamesRepository.createQueryBuilder("game")
      .leftJoinAndSelect("game.platforms", "platform")
      .leftJoinAndSelect("game.images", "images")
      .leftJoinAndSelect("game.genres", "genres")
      .leftJoinAndSelect("game.trailer", "trailer").where("game.Id = :id", {id});
    if(!found) {
      throw new NotFoundException();
    }
    return found.getOne();
  }

  async getGameReviewsById(id: number): Promise<ReviewsDto[]> {
    const reviews: ReviewsDto[] = [];
    let reviewsEnt: ReviewsDto;
    const found = await this.reviewRepository.createQueryBuilder("review")
      .leftJoinAndSelect("review.users", "user")
      .where("review.gameId = :id", {id}).getMany();
    console.log(found[0]);
    found.forEach(data => {
      const foundUsername = data.users.username;
      reviewsEnt = {
        id: data.id,
        ReviewTitle: data.ReviewTitle,
        ReviewText: data.ReviewText,
        ReviewScore: data.ReviewScore,
        username: foundUsername,
        gameId: data.gameId

      }
      reviews.push(reviewsEnt);
    })

    return reviews;
  }

  async getGamePlatforms(): Promise<Platform> {
    const found = await this.platformsRepository.findOne(1);

    if(!found) {
      throw new NotFoundException();
    }
    return found;
  }

    async deleteGameById(id: number): Promise<void> {
      // const foundGame = this.gamesRepository.findOne(id);
      // const test = getConnection()
      //   .createQueryBuilder()
      //   .relation(Game, "platforms")
      //   .of(foundGame);
      // const another = await test.delete();
      //
      // console.log(another);
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
