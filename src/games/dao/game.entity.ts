import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany, ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Images } from "./images.entity";
import { Platform } from "./platform.entity";
import { Genre } from "./genre.entity";
import { Trailer } from "./trailer.entity";
import { Review } from "./review.entity";


@Entity({name: 'game'})
export class Game {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  title: string;

  @Column({ type: Date })
  ReleaseDate: Date;

  @Column()
  Description: string;


  @Column({
    nullable: true
  })
  OverallScore: number;

  @Column()
  imagesId: number;

  @Column()
  trailerId: number;

  // @OneToOne(() => Images, (Images) => Images.Id, { onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @OneToOne(() => Images)
  @JoinColumn({ name: "imagesId" })
  images: Images;

  @OneToOne(() => Trailer)
  @JoinColumn({name: "trailerId"})
  trailer: Trailer;

  @ManyToMany(() => Platform, platform => platform.games, { onDelete: 'CASCADE' })
  @JoinTable({
    name: "GamePlatform",
    joinColumn: {
      name: "gameId",
      referencedColumnName: "Id"
    }
  })
  platforms: Platform[];

  @ManyToMany(() => Genre, genre => genre.games, {})
  @JoinTable({
    name: "GameGenre",
    joinColumn: {
      name: "gameId",
      referencedColumnName: "Id",
    }
  })
  genres: Genre[];

  @OneToMany(() => Review, review => review.game)
  reviews: Array<Review>;

}