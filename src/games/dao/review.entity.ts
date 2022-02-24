import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./game.entity";
import { Users } from "./users.entity";


@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ReviewTitle: string;

  @Column()
  ReviewText: string;

  @Column()
  ReviewScore: number;

  @Column()
  userId: number;

  @Column()
  gameId: number;

  @OneToOne(() => Users)
  @JoinColumn({ name: "userId"})
  users: Users;

  @OneToOne(() => Game)
  @JoinColumn( {name: "gameId"})
  game: Game;


}