import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./review.entity";

/**
 * An entity for a users table in the database
 */
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

  @OneToMany(() => Review, review => review.users)
  reviews: Array<Review>;

}