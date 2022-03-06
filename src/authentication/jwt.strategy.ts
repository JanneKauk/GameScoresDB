import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "../games/dao/users.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { Users } from "../games/dao/users.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository
  ) {
    super({
      secretOrKey: "secret1",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<Users> {
    const { username } = payload;
    const user: Users = await this.usersRepository.findOne({ username });
    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}