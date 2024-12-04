import { IEntity } from '../common/interfaces/entity.interface';
import { IDated } from '../common/interfaces/dated.interface';
export interface IBlog {
    title: string;
    content: string;
    image: string;
}
export interface IBlogEntity extends IBlog, IEntity, IDated {
}
