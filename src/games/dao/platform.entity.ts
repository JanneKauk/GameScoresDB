import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./game.entity";

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