import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto'


@Controller('')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Create New Category
  @Post('create-category')
  create_category(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<Object> {
    return this.categoriesService.create_category(createCategoryDto);
  }

  // Find All Categories
  @Get('find-categories')
  find_categories(): Promise<Object> {
    return this.categoriesService.find_categories();
  }

  // Find One Category
  @Get('find-category/:id')
  find_one_category_by_id(
    @Param('id') id: number
  ): Promise<Object> {
    return this.categoriesService.find_one_category_by_id(id);
  }

  // Update One Category
  @Put('update-category/:id')
  update_one_category(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<Object> {
    return this.categoriesService.update_one_category(updateCategoryDto, id);
  }

  // Remove One Category
  @Delete('remove-category/:id')
  remove_one_category(
    @Param('id') id: number
  ): Promise<Number | Object> {
    return this.categoriesService.remove_one_category(id);
  }
}