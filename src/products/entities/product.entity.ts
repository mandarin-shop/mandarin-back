import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('increment')
    product_id: number;
    
    @Column({type: 'text'})
    product_name: string;

    @Column({type: 'text'})
    product_salesman: string;

    @Column()
    product_count: number;

    @Column()
    product_price: number;

    @Column({type: 'text'})
    product_title: string;

    @Column({type: 'text'})
    product_description: string;
}