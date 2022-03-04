import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'images'})
export class Images{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  URL: string;

}