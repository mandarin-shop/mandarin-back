import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Users
      ]
    ),
    JwtModule.register({}),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}