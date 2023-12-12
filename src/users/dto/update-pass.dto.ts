import {
    IsString, 
    MaxLength, 
    MinLength, 
    IsNotEmpty 
} from "class-validator";

export class UpdatePassDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    new_password: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    confirm_password: string;
}