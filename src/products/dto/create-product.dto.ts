import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    product_name: string;

    @IsString()
    @IsNotEmpty()
    product_salesman: string;

    @IsNumber()
    @IsNotEmpty()
    product_count: number;

    @IsNumber()
    @IsNotEmpty()
    product_price: number;

    @IsString()
    @IsNotEmpty()
    product_title: string;

    @IsString()
    @IsNotEmpty()
    product_description: string;
}