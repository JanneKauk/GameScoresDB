import { JoinColumn, OneToOne, ViewColumn, ViewEntity } from "typeorm";
import { Game } from "./game.entity";


@ViewEntity({

  expression: `
  CREATE VIEW avgscores AS SELECT DISTINCT gameId, (select AVG(ReviewScore) FROM review WHERE review.gameId = game.Id) AS avg FROM review INNER JOIN game ON review.gameId = game.Id ORDER BY gameId
  `
})
export class avgscores {
  @ViewColumn()
  gameId
npm
  @ViewColumn()
  avg

}