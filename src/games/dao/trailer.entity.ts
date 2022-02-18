import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Trailer {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  URL: string
}