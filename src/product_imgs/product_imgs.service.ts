import fs from 'fs';

import { Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductImg } from './entities';
import { CreateProductImgDto } from './dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class ProductImgsService {
  constructor(
    @InjectRepository(ProductImg)private productImgRepository: Repository<ProductImg>,
    private fileService: FilesService
  ){}

  async create_product_img(createProductImgDto: CreateProductImgDto, image: any): Promise<Object> {
    const url = await this.fileService.createFile(image);
    
    const productImg = await this.productImgRepository.save(
      {
        product_id: createProductImgDto.product_id,
        img_file_name: url,
        product_img_url: `http://localhost:3000/${url}`
      }
    );

    return {
            message: 'Upload successfully',
            status: HttpStatus.OK,
            img_info: productImg
           };
  }

  async remove_product_img(id: number): Promise<HttpStatus | Object> {
    const [ productInfo ] = await this.productImgRepository.findBy({ product_img_id: id });

    if (!productInfo) return {
                              message: 'Product image Not Found',
                              status: HttpStatus.NOT_FOUND
                             };

    await this.productImgRepository.delete({ product_img_id: id });

    return HttpStatus.OK;
  }
}