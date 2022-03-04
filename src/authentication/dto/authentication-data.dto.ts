import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthenticationDataDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "Weak password"
  })
  Password: string;

  Email: string;
}