import { IsNotEmpty, IsString, IsOptional, IsNumber, isString } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    bookId!: string;

    user!: {
        _id: string,
        name: string
    };

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    comment!: string;

    @IsNumber()
    @IsOptional()
    rating?: number;
}

export class UpdateReviewDto {
    _id?: string | undefined;

    @IsString()
    @IsNotEmpty()
    bookId!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    comment!: string;

    @IsNumber()
    @IsOptional()
    rating?: number;
}