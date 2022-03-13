import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * An entity for a images table in the database
 */
@Entity({name: 'images'})
export class Images{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  URL: string;

}