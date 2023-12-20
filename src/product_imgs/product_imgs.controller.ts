import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Post, Body, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';

import { CreateProductImgDto } from './dto'
import { ProductImgsService } from './product_imgs.service';

@Controller('product-img')
export class ProductImgsController {
  constructor(private readonly productImgsService: ProductImgsService) {}

  // Upload Image Product
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  create_product_img(
    @Body() createProductImgDto: CreateProductImgDto,
    @UploadedFile() image: any
  ): Promise<Object | Number> {
    return this.productImgsService.create_product_img(createProductImgDto, image);
  }

  // Remove Image Product
  @Delete('remove/:id')
  remove_product_img(
    @Param('id') id: number
  ): Promise<Object | Number> {
    return this.productImgsService.remove_product_img(id);
  }
}