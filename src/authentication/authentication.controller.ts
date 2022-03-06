import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationDataDto } from "./dto/authentication-data.dto";
import { AuthenticationService } from "./authentication.service";

@Controller("authentication")
export class AuthenticationController {
  constructor(
    private authentiationService: AuthenticationService
  ) {
  }

  @Post("/signup")
  signUp(@Body() authenticationDataDto: AuthenticationDataDto): Promise<void> {
    return this.authentiationService.signUp(authenticationDataDto);
  }
  @Post("/signin")
  signIn(@Body() authenticationDataDto: AuthenticationDataDto): Promise<{ accessToken: string }> {
    return this.authentiationService.signIn(authenticationDataDto);
  }

}
