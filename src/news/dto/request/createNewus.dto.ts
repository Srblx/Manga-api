import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateNewsDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(800)
    content: string;

    @IsNotEmpty()
    @IsString()
    imageUrl: string;

}