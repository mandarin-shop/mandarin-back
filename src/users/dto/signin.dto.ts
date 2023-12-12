import {
    IsNotEmpty,
    IsPhoneNumber
} from "class-validator";


export class SignInDto {
    @IsNotEmpty()
    @IsPhoneNumber()
    phone_number: string;

    @IsNotEmpty()
    password: string;
}