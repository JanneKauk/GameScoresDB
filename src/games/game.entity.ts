import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Images } from "./images.entity";


@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({type: Date})
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
  @JoinColumn( { name: 'imagesId' })
  images: Images;
}