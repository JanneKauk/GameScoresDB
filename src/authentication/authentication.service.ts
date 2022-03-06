import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "../games/dao/users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthenticationDataDto } from "./dto/authentication-data.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {
  }

  async signUp(authenticationDataDto: AuthenticationDataDto): Promise<void> {
    return this.usersRepository.createUser(authenticationDataDto);
  }

  async signIn(authenticationDataDto: AuthenticationDataDto): Promise<{ accessToken: string }> {
    const { username, Password, Email } = authenticationDataDto;

    const user = await this.usersRepository.findOne({ username });
    if (user && (await bcrypt.compare(Password, user.Password))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException("Incorrect login information");
    }
  }
}
