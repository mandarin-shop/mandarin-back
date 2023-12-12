import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Users } from './entities';
import { SignInDto, SignUpDto, UpdateDataDto, UpdatePassDto } from './dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)private userRepository: Repository<Users>,
        private jwtService: JwtService
    ){}

    async signup(signUpDto: SignUpDto): Promise<Object>  {
        const [ user ] = await this.userRepository.findBy({ phone_number: signUpDto.phone_number });
        if(user) return { 
                            message: 'phone number already exists',
                            status: HttpStatus.CONFLICT
                        };
    
        const hashed_password = await bcrypt.hash(signUpDto.password, 7);
    
        const new_user = await this.userRepository.save(
          { 
            ...signUpDto,
            hashed_password
          }
        );
        
        const token = await this.getToken(new_user);
    
        return {
          message: 'sign up successfully',
          status: HttpStatus.OK,
          user: {
            user_id: new_user.user_id,
            full_name: new_user.full_name,
            phone_number: new_user.phone_number,
            hashed_password: new_user.hashed_password,
            is_admin: new_user.is_admin
          },
          token
        };
    }

    async signin(signInDto: SignInDto): Promise<Object> {
        const [ user ] = await this.userRepository.findBy({ phone_number: signInDto.phone_number });
        
        if (!user) return {
                            message: 'Phone number or password is incorrect',
                            status: HttpStatus.NOT_FOUND
                          };
    
        const pass = await bcrypt.compare(signInDto.password, user.hashed_password);
        if (!pass) return { 
                            message: 'Phone number or password is incorrect',
                            status: HttpStatus.NOT_FOUND 
                          };
    
        const token = await this.getToken(user);
    
        return  {
                    message: 'Sign in succesfully User', 
                    user: user,
                    status: HttpStatus.OK,
                    token
                }
    }

    async find_users(): Promise<Object> {
        const users = await this.userRepository.find();
    
        if(users.length === 0) return { 
                                        message: 'Users Not Found', 
                                        status: HttpStatus.NOT_FOUND
                                      };
        return {
                users: users,
                status: HttpStatus.OK,
               };
    }

    async find_one_user(id: number): Promise<Object> {
        const [ user ] = await this.userRepository.findBy({ user_id: id });
    
        if (!user) return {
                            message: 'User Not Found',
                            status: HttpStatus.NOT_FOUND
                          };
        return {
                user: user,
                status: HttpStatus.OK
               };
    }

    async update_data(id: number, updateDataDto: UpdateDataDto): Promise<Object> {
        const [ user ] = await this.userRepository.findBy({ user_id: id });
        if (!user) return {
                              message: 'User Not Found',
                              status: HttpStatus.NOT_FOUND
                            };
        
        await this.userRepository.update(
          { 
            user_id: id
          },
          {
            ...updateDataDto
          }
        );
    
        const [ update_user ] =  await this.userRepository.findBy({ user_id: id });
    
        return {
                user: update_user,
                status: HttpStatus.OK
               }
    }

    async update_password(id: number, updatePassDto: UpdatePassDto): Promise<Object>  {
        const [user] = await this.userRepository.findBy({ user_id: id });
        if (!user) return {
                            message: 'User Not Found',
                            status: HttpStatus.NOT_FOUND
                          };
    
        const pass = await bcrypt.compare(updatePassDto.password, user.hashed_password);
        if (!pass) return { 
                            message: 'Old password is incorrect', 
                            status: HttpStatus.CONFLICT
                          };
    
        if(updatePassDto.new_password != updatePassDto.confirm_password) return {
                                                                                  message: 'confirm password is incorrect',
                                                                                  status: HttpStatus.UNAUTHORIZED
                                                                                };
                                                                                        
        const hashed_password = await bcrypt.hash(updatePassDto.new_password, 7);
    
        await this.userRepository.update(
          {
            user_id: id
          }, 
          {
            hashed_password
          }
        );
    
        const [ update_user ] =  await this.userRepository.findBy({ user_id: id });
    
        return {
                 user: update_user,
                 status: HttpStatus.OK
               }
    }

    async remove_user(id: number): Promise<HttpStatus> {
        const [ user ] = await this.userRepository.findBy({ user_id: id });
        if(!user) return HttpStatus.NOT_FOUND;
    
        await this.userRepository.delete({ user_id: id });
    
        return HttpStatus.OK;
    }

    async getToken(user: Users) {
        const jwtPayload = { id: user.user_id, is_admin: user.is_admin }
      
        const token = await this.jwtService.signAsync(
                        jwtPayload,
                        {
                            secret: process.env.ACCES_TOKEN_KEY_USER,
                            expiresIn: process.env.ACCESS_TOKEN_TIME_USER
                        });
        return token;
    }
}