import { Body, Controller, Get, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './game.model';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  getAllGames(): Game[] {
    return this.gamesService.getAllGames();
  }

  @Post()
  createGame(@Body() createGameDto: CreateGameDto): Game {
    return this.gamesService.createGame(createGameDto);
  }
}
