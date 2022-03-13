import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * An entity for a trailers table in the database
 */
@Entity({name: 'trailer'})
export class Trailer {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  URL: string
}