import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'trailer'})
export class Trailer {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  URL: string
}