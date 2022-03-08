import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGamesFilterDto } from "./dto/get-games-filter.dto";
import { Game } from "./dao/game.entity";
import { ReviewsDto } from "./dto/reviews.dto";
import { AuthGuard } from "@nestjs/passport";
import { AddReviewDto } from "./dto/add-review.dto";

@Controller('games')
// @UseGuards(AuthGuard())
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  getGames(@Query() filterDTO: GetGamesFilterDto): Promise<Game[]> {
    return this.gamesService.getGames(filterDTO);
  }

  @Get("/everything/gameCount")
  getGameCount(){
    return this.gamesService.getGameCount();
  }

  @Get("/everything/:page")
  getGamesWithEverything(@Param('page') page: number): Promise<Game[]> {
    // const gamesWithPlatforms = await connection.getRepository()
    return this.gamesService.getGamesWithEverything(page);
  }

  @Get('/platforms/:id')
  getPlatform() {
    return this.gamesService.getGamePlatforms();
  }


  @Post()
  createGame(@Body() createGameDto: CreateGameDto, @Body('platformId') platformId: number): Promise<Game> {
    return this.gamesService.createGame(createGameDto, platformId);
  }

  @Get('/:id')
  getGameById(@Param('id') id: number): Promise<Game> {
    return this.gamesService.getGameById(id);
  }

  @Delete('/:id')
  deleteGameById(@Param('id') id: number): Promise<void> {
    return this.gamesService.deleteGameById(id);

  }

  @Patch('/:id/title')
  updateGameTitle(@Param('id') id: number, @Body('title') title: string): Promise<Game> {
    return this.gamesService.updateGameTitle(id, title);
  }

  @Get('/reviews/:id')
  getGameReviewsById(@Param('id') id: number): Promise<ReviewsDto[]> {
    return this.gamesService.getGameReviewsById(id);
  }

  @Post('/addreview')
  @UseGuards(AuthGuard())
  addReview(@Body() addReviewDto: AddReviewDto): Promise<boolean> {
    console.log("testing if requests comes this far");
    return this.gamesService.addReview(addReviewDto);
  }
}
