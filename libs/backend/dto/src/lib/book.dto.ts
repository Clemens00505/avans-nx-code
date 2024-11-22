import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { Id } from '@avans-nx-workshop/shared/api';

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

    @IsNumber()
    @IsOptional()
    publicationYear?: number;
}

export class UpsertBookDto {
    _id!: Id;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    author!: string;

    @IsString()
    @IsOptional()
    genre?: string;

    @IsNumber()
    @IsOptional()
    publicationYear?: number;
}

export class UpdateBookDto {
    _id?: string | undefined;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    author?: string;

    @IsString()
    @IsOptional()
    genre?: string;

    @IsNumber()
    @IsOptional()
    publicationYear?: number;
}