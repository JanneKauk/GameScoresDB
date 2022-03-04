import { EntityRepository, Repository } from "typeorm";
import { Users } from "./users.entity";
import { AuthenticationDataDto } from "../../authentication/dto/authentication-data.dto";
import * as bcrypt from 'bcrypt';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async createUser(authenticationDataDto: AuthenticationDataDto): Promise<void> {
    const { username, Password, Email } = authenticationDataDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    console.log(hashedPassword);

    const user = this.create({ username, Password: hashedPassword, Email });

    try {
      await this.save(user);
    } catch (error) {
      console.log(error.code());
    }
  }
}