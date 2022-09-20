import { Module } from '@nestjs/common';
import { ORMService } from './orm.service';
import { DBClientConfig } from '../postgre.client';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SallesEntity } from './entities/salles.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync(DBClientConfig),
    TypeOrmModule.forFeature([SallesEntity]),
  ],
  providers: [ORMService],
  exports: [ORMService],
})
export class OrmModule {}
