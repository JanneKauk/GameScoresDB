import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./game.entity";
import { Users } from "./users.entity";


@Entity({name: 'review'})
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

  @ManyToOne(() => Users, users => users.reviews)
  @JoinColumn({ name: "userId"})
  users: Users;

  @ManyToOne(() => Game, game => game.reviews)
  @JoinColumn( {name: "gameId"})
  game: Game;


}