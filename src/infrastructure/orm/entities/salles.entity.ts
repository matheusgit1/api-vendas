import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Injectable } from '@nestjs/common';

@Entity({ name: 'tb_salles' })
@Injectable()
export class ProductsEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'co_product_name', nullable: false })
  name?: string;

  @Column('numeric', { name: 'co_product_price', nullable: false })
  price?: number;

  @Column({ name: 'co_product_description', nullable: true })
  description?: string;
  //some logic here

  @Column({ name: 'co_product_categories', nullable: false, array: true })
  categories?: string;

  @Column({ name: 'co_product_main_categories', nullable: false })
  mainCategories?: string;

  @Column('numeric', {
    name: 'co_product_installments',
    nullable: true,
    default: 0,
  })
  installments?: number;

  @Column({ name: 'co_product_images', nullable: false, array: true })
  images?: string;

  @Column('uuid', { name: 'co_product_id', nullable: false })
  productId?: string;

  @Column({ name: 'co_user_id', nullable: false, select: false })
  userId?: string;

  @Column('numeric', {
    name: 'co_product_discount',
    nullable: true,
    default: 0,
  })
  discount?: number;

  @Column({ name: 'co_product_marc', nullable: true })
  marc?: string;

  @Column({ name: 'co_product_conditions', nullable: true })
  conditions?: string;

  @Column('json', { name: 'co_product_features', nullable: true })
  features?: any;

  @Column({
    name: 'co_product_seller',
    nullable: false,
  })
  seller?: string;

  @CreateDateColumn({ name: 'co_created_at', select: false })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'co_updated_at', select: false })
  updatedAt?: Date;
}
