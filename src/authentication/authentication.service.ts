import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "../games/dao/users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthenticationDataDto } from "./dto/authentication-data.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository
  ) {
  }

  async signUp(authenticationDataDto: AuthenticationDataDto): Promise<void> {
    return this.usersRepository.createUser(authenticationDataDto);
  }

  async signIn(authenticationDataDto: AuthenticationDataDto): Promise<string> {
    const { username, Password, Email } = authenticationDataDto;

    const user = await this.usersRepository.findOne({ username });
    if (user && (await bcrypt.compare(Password, user.Password))) {
      return "success";
    } else {
      throw new UnauthorizedException("Incorrect login information");
    }
  }
}
