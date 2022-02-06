import { IsOptional, IsString } from "class-validator";

export class GetGamesFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}