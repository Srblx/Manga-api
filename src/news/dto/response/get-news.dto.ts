import { ApiProperty } from "@nestjs/swagger";
import { GetMeDto } from "src/users/_utils/dto/response/get-me.dto";
import { GetUserDto } from "src/users/_utils/dto/response/get-user.dto";


export class GetNewsDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    imageUrl: string;

    @ApiProperty()
    user: GetUserDto;
}