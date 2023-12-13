import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Category } from './entities';
import { CreateCategoryDto, UpdateCategoryDto } from './dto'


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)private categoryRepository: Repository<Category>
  ){}

  async create_category(createCategoryDto: CreateCategoryDto): Promise<Object> {
    const { category_name } = createCategoryDto;
    
    const [ category ] = await this.categoryRepository.findBy({ category_name });
    if (category) return {
                          message: 'Category name already exists',
                          status: HttpStatus.FORBIDDEN
                         };

    const new_category = await this.categoryRepository.save({ ...createCategoryDto });

    return {
            message: 'Create new category successfully',
            status: HttpStatus.OK,
            category: new_category
           };
  }

  async find_categories(): Promise<Object> {
    const categories = await this.categoryRepository.find();

    if (categories.length === 0) return {
                                          message: 'Categories not found',
                                          status: HttpStatus.NOT_FOUND
                                        };
    return {
            status: HttpStatus.OK,
            categories
           };
  }

  async find_one_category_by_id(id: number): Promise<Object> {
    const [ category ] = await this.categoryRepository.findBy({ category_id: id });

    if(!category) return {
                          message: 'Category not found',
                          status: HttpStatus.NOT_FOUND
                         };
    return {
            status: HttpStatus.OK,
            category
           };
  }

  async update_one_category(updateCategoryDto: UpdateCategoryDto,id: number): Promise<Object> {
    const [ category ] = await this.categoryRepository.findBy({ category_id: id });

    if(!category) return {
                          message: 'Category not found',
                          status: HttpStatus.NOT_FOUND
                         };
    
    await this.categoryRepository.update(
      { 
        category_id: id
      },
      {
        ...updateCategoryDto
      }
    );

    const update_category = await this.categoryRepository.findBy({ category_id: id });

    return {
            status: HttpStatus.OK,
            category: update_category
           }
  }

  async remove_one_category(id: number): Promise<HttpStatus | Object> {
    const [ category ] = await this.categoryRepository.findBy({ category_id: id });

    if(!category) return {
                          message: 'Category not found',
                          status: HttpStatus.NOT_FOUND
                         };
    
    await this.categoryRepository.delete({ category_id: id });

    return HttpStatus.OK;
  }
}