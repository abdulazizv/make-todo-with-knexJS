import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import {IsNumber,IsString,IsOptional} from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsOptional()
    @IsNumber()
    readonly user_id:number;
    @IsOptional()
    @IsString()
    readonly task: string;
    @IsOptional()
    @IsString()
    description: string;
}
