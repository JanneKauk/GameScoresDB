import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationDataDto } from "./dto/authentication-data.dto";
import { AuthenticationService } from "./authentication.service";

@Controller("authentication")
export class AuthenticationController {
  constructor(
    private authentiationService: AuthenticationService
  ) {
  }

  /**
   * @returns Promise<void>
   * @param authenticationDataDto - Data access object for user creation
   */
  @Post("/signup")
  signUp(@Body() authenticationDataDto: AuthenticationDataDto): Promise<void> {
    return this.authentiationService.signUp(authenticationDataDto);
  }

  /**
   * @returns Promise<{ accessToken: string }>
   * @param authenticationDataDto - Data access object for user creation
   */
  @Post("/signin")
  signIn(@Body() authenticationDataDto: AuthenticationDataDto): Promise<{ accessToken: string }> {
    return this.authentiationService.signIn(authenticationDataDto);
  }

}
