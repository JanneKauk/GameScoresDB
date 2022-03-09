

export class getGameDto {

  Id: number;

  title: string;

  ReleaseDate: Date;

  Description: string;

  // URL: string;

  platforms: {Id: number, Name: string}[];

  images: {id: number, URL: string};

  genres: {Id: number, Name: string}[];

  trailer: {Id: number, URL: string};

  avgscores: number;
}