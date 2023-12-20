import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductImgDto {
    @IsString()
    @IsNotEmpty()
    product_id: string;
}