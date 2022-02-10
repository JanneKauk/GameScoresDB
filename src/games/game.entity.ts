import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Images } from "./images.entity";
import { Platform } from "./dao/platform.entity";


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

  @ManyToMany(() => Platform, platform => platform.games)
  @JoinTable({
    name: "GamePlatform",
    joinColumn: {
      name: "gameId",
      referencedColumnName: "Id"
    }
  })
  platforms: Platform[];
}