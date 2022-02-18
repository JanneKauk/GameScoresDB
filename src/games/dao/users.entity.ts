import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Users {

  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  username: string;

  @Column()
  Password: string;

  @Column()
  Email: string;

}