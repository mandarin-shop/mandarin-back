import {
    IsString, 
    IsNotEmpty,
    IsPhoneNumber, 
} from "class-validator";

export class UpdateDataDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;
    
    @IsNotEmpty()
    @IsPhoneNumber()
    phone_number: string;
}