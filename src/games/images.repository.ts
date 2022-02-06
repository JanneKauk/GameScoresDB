import { EntityRepository, Repository } from "typeorm";
import { Images } from "./images.entity";


@EntityRepository(Images)
export class ImagesRepository extends Repository<Images> {

}