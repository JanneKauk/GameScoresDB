import { IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator";

export class AddReviewDto {

  // @IsNotEmpty()
  ReviewTitle: string;

  // @IsNotEmpty()
  ReviewText: string;

  // @IsNumber()
  // @MaxLength(10)
  ReviewScore: number;

  // @IsNumber()
  userId: number;

  // @IsNumber()
  gameId: number;

}