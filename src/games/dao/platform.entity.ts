import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./game.entity";

/**
 * An entity for a platform table in the database
 */
@Entity({name: 'platform'})
export class Platform {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Name: string;

  @ManyToMany(() => Game, game => game.platforms)
  @JoinTable({
    name: "GamePlatform",
    joinColumn: {
      name: 'platformId',
      referencedColumnName: 'Id'
    }
  })
  games: Game[];
}