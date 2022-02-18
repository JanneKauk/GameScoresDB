import { EntityRepository, Repository } from "typeorm";
import { Trailer } from "./trailer.entity";


@EntityRepository(Trailer)
export class TrailerRepository extends Repository<Trailer> {

}