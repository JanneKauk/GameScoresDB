import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Images{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  URL: string;

}