import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  Req,
  Param,
  Put,
  Patch,
  Delete,
  Res,
} from '@nestjs/common';
// import { Request } from 'express';s
import { SallesService } from './salles.service';
// import { JwtAuthGuard } from '../../infrastructure/jwt/jwt-auth.guard';
// import { CreateProductEntity } from './dtos/create-product.dto';
// import { UpdateProductEntity } from './dtos/update-product.dto';
// import { DesactiveProductEntity } from './dtos/desactive-product.dto';
// import { FindByFiltersEntity } from './dtos/find-by-filters.dto';

@Controller('/v1/salles')
export class SallesController {
  constructor(private readonly SallesService: SallesService) {}

  @Get()
  async getRoute() {
    return 'this salles api and ready';
  }

  @Post()
  async createSalle(): Promise<any> {
    return;
  }
}
