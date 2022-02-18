import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Images } from "./images.entity";
import { Platform } from "./platform.entity";
import { Genre } from "./genre.entity";


@Entity()
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

  // @OneToOne(() => Images, (Images) => Images.Id, { onUpdate: 'CASCADE', onDelete: 'CASCADE'})
  @OneToOne(() => Images)
  @JoinColumn({ name: "imagesId" })
  images: Images;

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
}