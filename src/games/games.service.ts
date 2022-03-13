import { Injectable, NotFoundException } from "@nestjs/common";
import { GamesRepository } from "./dao/games.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "./dao/game.entity";
import { CreateGameDto } from "./dto/create-game.dto";
import { GetGamesFilterDto } from "./dto/get-games-filter.dto";
import { Platform } from "./dao/platform.entity";
import { PlatformsRepository } from "./dao/platforms.repository";
import { getConnection, getManager } from "typeorm";
import { ReviewRepository } from "./dao/review.repository";
import { Review } from "./dao/review.entity";
import { UsersRepository } from "./dao/users.repository";
import { ReviewsDto } from "./dto/reviews.dto";
import { AddReviewDto } from "./dto/add-review.dto";
import { avgscores } from "./dao/avgscores.entity";
import { getGameDto } from "./dto/get-game-dto";
import { isAlpha } from "class-validator";

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

  async getGameCount(): Promise<number> {
    const count = await this.gamesRepository.createQueryBuilder("game")
      .select("*", "count").getCount();
    console.log("DB log for count:" + count);
    return count;
  }

  async getGamesWithEverything(page): Promise<getGameDto[]> {
    const to = 20 * page;
    const from = to - 19;
    // const gamesWithPlatforms = await connection.getRepository()
    const test = await this.gamesRepository.createQueryBuilder("game")
      .leftJoinAndSelect("game.platforms", "platform")
      .leftJoinAndSelect("game.images", "images")
      .leftJoinAndSelect("game.genres", "genres")
      .leftJoinAndSelect("game.trailer", "trailer").where("game.Id >= :from and game.Id <= :to", { from, to })
      .getMany();

    console.log(await this.reviewRepository.createQueryBuilder().getMany());
    console.log(test);
    const entityManager = getManager();
    const list: getGameDto[] = [];
    for (let i = 0; i < test.length; i++) {
      console.log(test[i].Id);
      console.log("name " + test[i].title);
      const avgscoresfound = await entityManager.findOne(avgscores, { gameId: test[i].Id });
      console.log("dsfa");
      // console.log(avgscoresfound);
      if (typeof avgscoresfound !== "undefined") {
        console.log("inside");
        console.log(avgscoresfound.avg);
        const foundGame: getGameDto = {
          Id: test[i].Id,
          title: test[i].title,
          ReleaseDate: test[i].ReleaseDate,
          Description: test[i].Description,
          platforms: test[i].platforms,
          images: test[i].images,
          genres: test[i].genres,
          trailer: test[i].trailer,
          avgscores: avgscoresfound.avg.toFixed(1)
        };
        list.push(foundGame);
      } else {
        const foundGame: getGameDto = {
          Id: test[i].Id,
          title: test[i].title,
          ReleaseDate: test[i].ReleaseDate,
          Description: test[i].Description,
          platforms: test[i].platforms,
          images: test[i].images,
          genres: test[i].genres,
          trailer: test[i].trailer,
          avgscores: 0
        };
        list.push(foundGame);
      }

    }


    return list;
  }

  async createGame(createGameDto: CreateGameDto, platformId: number): Promise<Game> {
    const { title, Description, ReleaseDate, imagesId } = createGameDto;

    const game = this.gamesRepository.create({
      title,
      Description,
      ReleaseDate,
      imagesId
    });
    const savedGame = await this.gamesRepository.save(game);
    await getConnection()
      .createQueryBuilder()
      .relation(Game, "platforms")
      .of(savedGame)
      .add(platformId);

    return game;
  }

  async getGameById(id: number): Promise<getGameDto> {
    // const found = await this.gamesRepository.findOne(id);
    // const avg = await this.reviewRepository.createQueryBuilder("review").select("AVG(review.ReviewScore)", "avg").from(Review, "reviews").where("review.gameId = :id", {id}).getRawOne();
    // console.log(avg.avg);
    // await this.gamesRepository.createQueryBuilder().update(Game).set({OverallScore: Math.floor(avg.avg)}).where("id = :id", {id}).execute();
    const found = await this.gamesRepository.createQueryBuilder("game")
      .leftJoinAndSelect("game.platforms", "platform")
      .leftJoinAndSelect("game.images", "images")
      .leftJoinAndSelect("game.genres", "genres")
      .leftJoinAndSelect("game.trailer", "trailer").where("game.Id = :id", { id });

    if (!found) {
      throw new NotFoundException();
    }
    const { Id, title, ReleaseDate, Description, platforms, images, genres, trailer } = await found.getOne();

    const entityManager = getManager();

    const avgscoresfound = await entityManager.findOne(avgscores, { gameId: id });
    let foundGame: getGameDto;
    try {

      foundGame = {
        Id,
        title,
        ReleaseDate,
        Description,
        platforms,
        images,
        genres,
        trailer,
        avgscores: avgscoresfound.avg.toFixed(1)

      };

    } catch (error) {

      console.log(error.message);
      foundGame = {
        Id,
        title,
        ReleaseDate,
        Description,
        platforms,
        images,
        genres,
        trailer,
        avgscores: 0
      };

    }
    return foundGame;
  }

  async getGameReviewsById(id: number): Promise<ReviewsDto[]> {
    const reviews: ReviewsDto[] = [];
    let reviewsEnt: ReviewsDto;
    const found = await this.reviewRepository.createQueryBuilder("review")
      .leftJoinAndSelect("review.users", "user")
      .where("review.gameId = :id", { id }).getMany();
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

      };
      reviews.push(reviewsEnt);
    });

    return reviews;
  }

  async getGamePlatforms(): Promise<Platform> {
    const found = await this.platformsRepository.findOne(1);

    if (!found) {
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
    if (result.affected === 0) {
      throw new NotFoundException("Game not found");
    }

  }


  async addReview(addReviewDto: AddReviewDto, Id: number): Promise<boolean> {
    console.log("service " + Id);
    const { ReviewTitle, ReviewText, ReviewScore, userId, gameId } = addReviewDto;
    const user = await this.usersRepository.findOne(Id);
    const game = await this.gamesRepository.findOne(gameId);
    if (user && game) {
      console.log("id " + userId + " gameId " + gameId);
      const found = this.reviewRepository.createQueryBuilder("review").where("review.userId = :Id", { Id }).andWhere("review.gameId = :gameId", { gameId }).getOne();
      // const entityManager = getManager();

      // const avgscoresfound = await entityManager.findOne( avgscores,{gameId: Id})
      //   console.log(avgscoresfound)
      //   await this.gamesRepository.createQueryBuilder().update(Game).set({OverallScore: Math.floor(avgscoresfound.avg)}).where("id = :id", {Id}).execute();

      if (!await found) {
        console.log("not found");
        const newReview = this.reviewRepository.create({
          ReviewTitle,
          ReviewText,
          ReviewScore,
          userId: Id,
          gameId,
          users: user,
          game
        });
        const saved = await this.reviewRepository.save(newReview);
        console.log("saved " + saved);

        return true;
      }
    }
    console.log("FALSE");
    return false;
  }
}
