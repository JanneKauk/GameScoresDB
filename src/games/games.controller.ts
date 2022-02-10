import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGamesFilterDto } from "./dto/get-games-filter.dto";
import { Game } from "./game.entity";
import { CreatePlatformDto } from "./dto/create-platform.dto";

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  getGames(@Query() filterDTO: GetGamesFilterDto): Promise<Game[]> {
    return this.gamesService.getGames(filterDTO);
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
}
