import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@Req() request: any) {
    console.log(request);
    return `Access_token is valid:) for userId: ${request.user.id} with email: ${request.user.email}`;
  }

  @Patch()
  editUser(userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
