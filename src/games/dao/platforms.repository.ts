import { EntityRepository, Repository } from "typeorm";
import { Platform } from "./platform.entity";


@EntityRepository(Platform)
export class PlatformsRepository extends Repository<Platform> {

}