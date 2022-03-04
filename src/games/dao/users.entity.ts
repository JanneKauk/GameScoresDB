import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'users'})
export class Users {

  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  Password: string;

  @Column()
  Email: string;

}