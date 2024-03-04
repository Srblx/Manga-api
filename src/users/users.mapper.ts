import { GetUserDto } from './_utils/dto/response/get-user.dto';
import { UserDocument } from './users.schema';
import { GetMeDto } from './_utils/dto/response/get-me.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersMapper {
/*   static  */toGetUserDto = (user: UserDocument): GetUserDto => ({
    id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
  });

/*   static  */toGetMeDto = (user: UserDocument): GetMeDto => ({
    id: user._id,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
  });
}

//table news avec get new et create news seul les admin peuvent create new que ce soit dans le back ou le front le securiste erreur si non admin et dans le from aussi 
// new dossier ajouter des mapper + repository 