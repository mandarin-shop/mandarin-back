import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Product } from './entities';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor( @InjectRepository(Product)private productRepository: Repository<Product> ){}

  async create_product(createProductDto: CreateProductDto): Promise<Object> {
    const newProduct = await this.productRepository.save(
      {
        ...createProductDto,
      }
    );

    return {
            message: 'Create successfully',
            product: newProduct,
            status: HttpStatus.OK
           };
  }

  async find_products(): Promise<Object> {
    const products = await this.productRepository.find();

    if (products.length === 0) return {
                                          message: 'Products not found',
                                          status: HttpStatus.NOT_FOUND
                                        };
    return {
            status: HttpStatus.OK,
            products
           };
  }

  async find_one_product_by_id(id: number): Promise<Object> {
    const [ product ] = await this.productRepository.findBy({ product_id: id });

    if(!product) return {
                          message: 'Product not found',
                          status: HttpStatus.NOT_FOUND
                         };
    return {
            status: HttpStatus.OK,
            product
           };
  }

  async search_product_by_name(name: string): Promise<Object> {
    const product = await this.productRepository.find({
      where : {
        product_name : Like(`%${name}%`)
      }
    });

    if (product.length === 0) return {
                          status: HttpStatus.NOT_FOUND,
                          message: 'Product Not Found'
                         }
    return {    
            status: HttpStatus.OK,
            product
           };
  }

  async update_one_product(updateProductDto: UpdateProductDto,id: number): Promise<Object> {
    const [ product ] = await this.productRepository.findBy({ product_id: id });

    if(!product) return {
                          message: 'Product not found',
                          status: HttpStatus.NOT_FOUND
                         };
    
    await this.productRepository.update(
      { 
        product_id: id
      },
      {
        ...updateProductDto
      }
    );

    const update_product = await this.productRepository.findBy({ product_id: id });

    return {
            status: HttpStatus.OK,
            product: update_product
           }
  }

  async remove_one_product(id: number): Promise<HttpStatus | Object> {
    const [ product ] = await this.productRepository.findBy({ product_id: id });

    if(!product) return {
                          message: 'Product not found',
                          status: HttpStatus.NOT_FOUND
                         };
    
    await this.productRepository.delete({ product_id: id });

    return HttpStatus.OK;
  }
}