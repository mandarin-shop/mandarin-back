import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductImg } from './entities';
import { FilesModule } from '../files/files.module';
import { ProductImgsService } from './product_imgs.service';
import { ProductImgsController } from './product_imgs.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        ProductImg
      ]
    ),
    FilesModule
  ],
  controllers: [ProductImgsController],
  providers: [ProductImgsService],
})
export class ProductImgsModule {}
