import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./game.entity";

/**
 * An entity for a genre table in the database
 */
@Entity({name: 'genre'})
export class Genre {

  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Name: string;

  @ManyToMany(() => Game, game => game.genres)
  @JoinTable({
    name: "GameGenre",
    joinColumn: {
      name: 'genreId',
      referencedColumnName: 'Id'
    }
  })
  games: Game[];

}