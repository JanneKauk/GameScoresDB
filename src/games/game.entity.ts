import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class gamelistitem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  platforms: string;

  @Column()
  imageUrl: string;

  @Column()
  Description: string;

  @Column({
    nullable: true
  })
  OverallScore: number;

}