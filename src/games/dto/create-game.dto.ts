import { IsDate, IsNotEmpty } from "class-validator";


export class CreateGameDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  Description: string;

  ReleaseDate: Date;

  @IsNotEmpty()
  imagesId: number;

  // OverallScore: number;
}
