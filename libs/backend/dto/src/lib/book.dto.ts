import { IsNotEmpty, IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    author!: string;

    @IsString()
    @IsOptional()
    genre?: string;

    @IsString()
    @IsNotEmpty()
    coverUrl!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    publicationYear?: number;

    @IsString()
    @IsOptional()
    language?: string;

    @IsString()
    @IsOptional()
    publicator?: string;

    @IsArray()
    @IsOptional()
    reviews?: string[];
}

export class UpdateBookDto {
    _id?: string | undefined;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    coverUrl!: string;

    @IsString()
    @IsNotEmpty()
    author!: string;

    @IsString()
    @IsOptional()
    genre?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    publicationYear?: number;

    @IsString()
    @IsOptional()
    language?: string;

    @IsString()
    @IsOptional()
    publicator?: string;

    @IsArray()
    @IsOptional()
    reviews?: string[];
}