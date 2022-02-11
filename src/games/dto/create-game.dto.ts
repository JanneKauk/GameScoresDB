import { IsNotEmpty } from "class-validator";


export class CreateGameDto {
  @IsNotEmpty()
  Id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  platforms: string;

  @IsNotEmpty()
  imageUrl: string;

  @IsNotEmpty()
  Description: string;

  OverallScore: number;
}
