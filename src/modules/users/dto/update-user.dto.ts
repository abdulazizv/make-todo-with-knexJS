import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsString,IsOptional} from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    readonly name: string;
    @IsString()
    @IsOptional()
    readonly phone:string;
}
