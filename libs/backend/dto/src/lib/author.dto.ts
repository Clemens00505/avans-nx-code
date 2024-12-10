import { IsString, IsNotEmpty, IsDate, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateBookDto } from './book.dto';


export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateBookDto)
    books!: CreateBookDto[];
}

export class UpdateAuthorDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    email!: string;

    @IsDate()
    @Type(() => Date)
    birthDate!: Date;

    @IsString()
    @IsNotEmpty()
    bio!: string;

    @IsString()
    @IsNotEmpty()
    photo!: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateBookDto)
    @IsOptional()
    books?: CreateBookDto[];
}