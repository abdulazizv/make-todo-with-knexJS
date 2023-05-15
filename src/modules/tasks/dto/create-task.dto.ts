import {IsString,IsNumber,IsBoolean} from 'class-validator'
export class CreateTaskDto {
    @IsNumber()
    readonly user_id:number;
    @IsString()
    readonly task: string;
    @IsString()
    description: string;
}
