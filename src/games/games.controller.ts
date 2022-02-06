import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGamesFilterDto } from "./dto/get-games-filter.dto";
import { Game } from "./game.entity";

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  getGames(@Query() filterDTO: GetGamesFilterDto): Promise<Game[]> {
    return this.gamesService.getGames(filterDTO);
  }


  @Post()
  createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gamesService.createGame(createGameDto);
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
