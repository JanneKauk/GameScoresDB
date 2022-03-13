import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { GamesService } from "./games.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { GetGamesFilterDto } from "./dto/get-games-filter.dto";
import { Game } from "./dao/game.entity";
import { ReviewsDto } from "./dto/reviews.dto";
import { AuthGuard } from "@nestjs/passport";
import { AddReviewDto } from "./dto/add-review.dto";
import { getGameDto } from "./dto/get-game-dto";

@Controller("games")
// @UseGuards(AuthGuard())
export class GamesController {
  constructor(private gamesService: GamesService) {
  }

  /**
   * @returns Promise<Game[]>
   * @param filterDTO - Data transfer object for filtering games
   */
  @Get()
  getGames(@Query() filterDTO: GetGamesFilterDto): Promise<Game[]> {
    return this.gamesService.getGames(filterDTO);
  }

  /**
   * @returns
   */
  @Get("/everything/gameCount")
  getGameCount() {
    return this.gamesService.getGameCount();
  }

  /**
   * @returns Promise<getGameDto[]>
   * @param page
   */
  @Get("/everything/:page")
  getGamesWithEverything(@Param("page") page: number): Promise<getGameDto[]> {
    // const gamesWithPlatforms = await connection.getRepository()
    return this.gamesService.getGamesWithEverything(page);
  }

  /**
   * @returns - Returns all platforms
   */
  @Get("/platforms/:id")
  getPlatform() {
    return this.gamesService.getGamePlatforms();
  }

  /**
   * @returns Promise<Game>
   * @param createGameDto - Data transfer object for creating games
   * @param platformId - Id of a platform
   */
  @Post()
  createGame(@Body() createGameDto: CreateGameDto, @Body("platformId") platformId: number): Promise<Game> {
    return this.gamesService.createGame(createGameDto, platformId);
  }

  /**
   * @returns Promise<getGameDto>
   * @param id - Id of a game
   */
  @Get("/:id")
  getGameById(@Param("id") id: number): Promise<getGameDto> {
    return this.gamesService.getGameById(id);
  }

  /**
   * @returns Promise<void>
   * @param id - Id of a game to be deleted
   */
  @Delete("/:id")
  deleteGameById(@Param("id") id: number): Promise<void> {
    return this.gamesService.deleteGameById(id);

  }

  /**
   * @returns Promise<ReviewsDto[]>
   * @param id - parameter id
   */
  @Get("/reviews/:id")
  getGameReviewsById(@Param("id") id: number): Promise<ReviewsDto[]> {
    return this.gamesService.getGameReviewsById(id);
  }

  /**
   * @returns Promise<boolean>
   * @param addReviewDto - Data transfer object for adding reviews
   * @param req - the whole request
   */
  @Post("/addreview")
  @UseGuards(AuthGuard())
  addReview(@Body() addReviewDto: AddReviewDto, @Req() req): Promise<boolean> {
    console.log("test");
    return this.gamesService.addReview(addReviewDto, req.user.Id);
  }
}
