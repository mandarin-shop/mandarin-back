import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto'

@Controller('')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Create New Product
  @Post('create-product')
  create_product(
    @Body() createProductDto: CreateProductDto
  ): Promise<Object> {
    return this.productsService.create_product(createProductDto);
  }

  // Find All Product
  @Get('find-products')
  find_products(): Promise<Object> {
    return this.productsService.find_products();
  }

  // Find One Product
  @Get('find-product/:id')
  find_one_product_by_id(
    @Param('id') id: number
  ): Promise<Object> {
    return this.productsService.find_one_product_by_id(id);
  }

  // Find By Name In Product
  @Get('search-product/:name')
  search_product_by_name(
    @Param('name') name: string
  ): Promise<Object> {
    return this.productsService.search_product_by_name(name);
  }

  // Update One Product
  @Put('update-product/:id')
  update_one_product(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Object> {
    return this.productsService.update_one_product(updateProductDto, id);
  }

  // Remove One Product
  @Delete('remove-product/:id')
  remove_one_product(
    @Param('id') id: number
  ): Promise<Number | Object> {
    return this.productsService.remove_one_product(id);
  }
}