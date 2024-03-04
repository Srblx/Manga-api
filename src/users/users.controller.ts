import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Protect } from '../auth/_utils/decorator/protect.decorator';
import { User } from './_utils/decorator/user.decorator';
import { UserDocument } from './users.schema';

import { GetUserDto } from './_utils/dto/response/get-user.dto';

import { GetMeDto } from './_utils/dto/response/get-me.dto';
import { UserByIdPipe } from './_utils/user-by-id.pipe';
import { UserRoleEnum } from './_utils/user-role.enum';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Protect()
  @Get('me')
  @ApiOperation({
    summary: "Récupére les informations de l'utilisateur connecter.",
  })
  @ApiOkResponse({ description: 'SUCCESS', type: GetMeDto })
  getCurrentUser(@User() user: UserDocument) {
    return this.usersService.getCurrentUser(user);
  }

  @Protect()
  @Get(':userId')
  @ApiOperation({
    summary: "Récupére les informations d'un utilisateur avec son Id.",
  })
  @ApiParam({ type: 'string', name: 'userId' })
  @ApiOkResponse({ description: 'SUCCESS', type: GetUserDto })
  getUserById(@Param('userId', UserByIdPipe) user: UserDocument) {
    return this.usersService.getUser(user);
  }

  @Protect(UserRoleEnum.ADMIN)
  @Delete(':userId')
  @ApiOperation({ summary: 'Supprime un utilisateur.' })
  @ApiParam({ type: 'string', name: 'userId' })
  @ApiOkResponse({ description: 'SUCCESS', type: GetUserDto })
  deleteUser(@Param('userId', UserByIdPipe) userToDelete: UserDocument) {
    return this.usersService.deleteUser(userToDelete);
  }
}
