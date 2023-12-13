import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('increment')
    category_id: number;
  
    @Column({type: 'text'})
    category_name: string;
}