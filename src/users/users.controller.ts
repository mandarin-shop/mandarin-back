import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { UsersService } from './users.service';
import { SignInDto, SignUpDto, UpdateDataDto, UpdatePassDto } from './dto';


@Controller('')
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
  @Get('find-users')
  find_users(): Promise<Object> {
    return this.usersService.find_users()
  }

  // Find All Admins
  @Get('find-admins')
  find_admins(): Promise<Object> {
    return this.usersService.find_admins()
  }

  // Find BY ID in Admin
  @Get('find-admin/:id')
  find_one_admin(
    @Param('id') id: number
  ): Promise<Object> {
    return this.usersService.find_one_admin(id)
  }

  // Find BY ID in User
  @Get('find-user/:id')
  find_one_user(
    @Param('id') id: number
  ): Promise<Object> {
    return this.usersService.find_one_user(id)
  }

  // Find By Name In User
  @Get('search-users/:name')
  find_search_by_name_users(
    @Param('name') name: string
  ): Promise<Object> {
    return this.usersService.find_search_by_name_users(name);
  }

  // Find By Name In User
  @Get('search-admins/:name')
  find_search_by_name_admins(
    @Param('name') name: string
  ): Promise<Object> {
    return this.usersService.find_search_by_name_admins(name);
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

  // Make Admin a User or Make a User an Administrator
  @Get('admin-or-user/:id')
  is_admin_user(
    @Param('id') id: number
  ): Promise<Object> {
    return this.usersService.is_admin_user(id)
  }
}