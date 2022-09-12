import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ORMService } from '../../infrastructure/orm/orm.service';
import { CreateProductEntity } from './dtos/create-product.dto';
import { UpdateProductEntity } from './dtos/update-product.dto';
import { DesactiveProductEntity } from './dtos/desactive-product.dto';
import { FindByFiltersEntity } from './dtos/find-by-filters.dto';
import { ImageUploadService } from '../../infrastructure/services/uploads.service';

@Injectable()
export class SallesService {
  private readonly REGEX_UUID: string =
    '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';

  constructor(
    private jwtService: JwtService,
    private readonly ormService: ORMService,
  ) // private readonly imageUpload: ImageUploadService,
  {}

  async create(body: CreateProductEntity, token: string) {
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });
    const fullBody = { ...body, seller: user.username };
    const created = await this.ormService.createOne(fullBody, user.id);
    return created;
  }

  async update(body: UpdateProductEntity, token: string) {
    if (!body.id.match(this.REGEX_UUID)) {
      throw new BadRequestException();
    }
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });
    const created = await this.ormService.updateOneById(body, user.id);
    return created;
  }

  async getProductById(productId: string) {
    if (!productId.match(this.REGEX_UUID)) {
      throw new BadRequestException();
    }

    const product = await this.ormService.findOneById(productId);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  async getProducs(limits = 30) {
    const products = await this.ormService.find(limits);
    if (!products) {
      throw new NotFoundException();
    }
    return products;
  }

  async desactiveProduct(body: DesactiveProductEntity, token: string) {
    if (!body.id.match(this.REGEX_UUID)) {
      throw new BadRequestException();
    }
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });
    const desactive = await this.ormService.desactiveOne(body.id, user.id);
    return desactive;
  }

  async deleteProduct(body: DesactiveProductEntity, token: string) {
    if (!body.id.match(this.REGEX_UUID)) {
      throw new BadRequestException();
    }
    const user = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: process.env.JWT_SECRET,
    });
    const desactive = await this.ormService.deleteOne(body.id, user.id);
    return desactive;
  }

  async findByCategories(filters: FindByFiltersEntity) {
    const productByCategory = await this.ormService.findByFilters(filters);
    return productByCategory;
  }

  // async fileupload(req, res) {
  //   try {
  //     const filepaths = await this.imageUpload.fileupload(req, res);
  //     console.log('filepaths: ', filepaths);
  //     return filepaths;
  //   } catch (error) {
  //     return res
  //       .status(500)
  //       .json(`Failed to upload image file: ${error.message}`);
  //   }
  // }
}
