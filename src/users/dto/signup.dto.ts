import { 
    IsString,
    MaxLength,
    MinLength,
    IsNotEmpty,
    IsPhoneNumber
} from "class-validator";


export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone_number: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(25)
    password: string;
}