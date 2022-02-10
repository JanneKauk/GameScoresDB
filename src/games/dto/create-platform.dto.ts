import { IsNotEmpty, IsNumber } from "class-validator";

/**
 * This dto is for giving a blueprint for creating and validating a Platform
 */
export class CreatePlatformDto {

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  Name: string;
}