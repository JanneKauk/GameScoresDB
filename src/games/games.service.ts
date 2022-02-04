import { Injectable } from '@nestjs/common';
import { Game } from './game.model';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  private games: Game[] = [
    { id: '1', description: 'Great Game', title: 'Nier: Automata' },
  ];

  getAllGames(): Game[] {
    return this.games;
  }

  createGame(createGameDto: CreateGameDto): Game {
    const { title, description } = createGameDto;
    const game: Game = {
      id: '' + Math.random(),
      title,
      description,
    };
    this.games.push(game);
    return game;
  }
}
