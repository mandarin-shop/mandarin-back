import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('increment')
  user_id: number;

  @Column({type: 'text'})
  full_name: string;

  @Column({type: 'text'})
  phone_number: string;

  @Column({type: 'text'})
  hashed_password: string;

  @Column({ default: false })
  is_admin: boolean;
}