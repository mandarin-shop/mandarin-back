import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products_images')
export class ProductImg {
    @PrimaryGeneratedColumn('increment')
    product_img_id: number;
  
    @Column()
    product_id: string;

    @Column({ type: 'text' })
    product_img_url: string;

    @Column({ type: 'text' })
    img_file_name: string;
}