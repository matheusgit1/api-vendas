import { Module } from '@nestjs/common';
import { SallesService } from './salles.service';
import { SallesController } from './salles.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from '../../infrastructure/orm/entities/salles.entity';
import { JwtModule } from '@nestjs/jwt';
import { ORMService } from '../../infrastructure/orm/orm.service';
import { OrmModule } from '../../infrastructure/orm/orm.module';
import { JwtStrategy } from '../../infrastructure/jwt/jwt.strategy';

// import { MulterModule } from '@nestjs/platform-express';
// import { ImageUploadService } from '../../infrastructure/services/uploads.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ProductsEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    // MulterModule.register({
    //   dest: './uploads',
    // }),
    OrmModule,
  ],
  providers: [SallesService, ORMService, JwtStrategy], //mageUploadService
  controllers: [SallesController],
  exports: [SallesService, ORMService], //ImageUploadService
})
export class SallesModule {}
