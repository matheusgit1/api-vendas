import { ProductsEntity } from './entities/salles.entity';

export interface ORMRepository {
  findOneByEmail: (email) => Promise<ProductsEntity>;
  createOne: (body: ProductsEntity) => Promise<ProductsEntity[]>;
  updateOne(set: any, where: string, params: any): Promise<void>;
}
