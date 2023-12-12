import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { UsersService } from './users.service';
import { SignInDto, SignUpDto, UpdateDataDto, UpdatePassDto } from './dto';


@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Sign Up User
  @Post('signup')
  signup(
    @Body() signUpDto: SignUpDto
  ): Promise<Object> {
    return this.usersService.signup(signUpDto);
  }

  // Sign In User
  @Post('signin')
  signin(
    @Body() SignInDto: SignInDto
  ): Promise<Object> {
    return this.usersService.signin(SignInDto)
  }

  // Find All Users
  @Get('find')
  find_users(): Promise<Object> {
    return this.usersService.find_users()
  }

  // Find BY ID in User
  @Get('find/:id')
  find_one_user(
    @Param('id') id: number
  ): Promise<Object> {
    return this.usersService.find_one_user(id)
  }

  // Update User Data
  @Put('update/:id')
  update_data(
    @Param('id') id: number, 
    @Body() updateDataDto: UpdateDataDto
  ): Promise<Object> {
    return this.usersService.update_data(id, updateDataDto)
  }

  // Update User Password
  @Put('update-password/:id')
  update_password(
    @Param('id') id: number, 
    @Body() updatePassDto: UpdatePassDto
  ): Promise<Object> {
    return this.usersService.update_password(id, updatePassDto);
  }

  // Remove One User BY ID
  @Delete('remove/:id')
  remove_user(
    @Param('id') id: number
  ): Promise<Number> {
    return this.usersService.remove_user(id);
  }
}