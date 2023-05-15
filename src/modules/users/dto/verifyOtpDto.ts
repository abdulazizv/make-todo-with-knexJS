import {IsString} from 'class-validator';
export class verifyOtpDto {
    @IsString()
    readonly otp:string;
    @IsString()
    readonly phone:string;
}