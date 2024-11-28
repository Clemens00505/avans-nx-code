import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsMongoId } from 'class-validator';

export type BookDocument = Book & Document;

@Schema()
export class Book {
    @IsMongoId()
    _id!: string;

    @Prop({
        required: true,
        type: String
    })
    coverUrl!: string;

    @Prop({
        required: true,
        type: String
    })
    title!: string;

    @Prop({
        required: true,
        type: String
    })
    author!: string;

    @Prop({
        required: true,
        type: String
    })
    genre!: string;

    @Prop({
        required: false,
        type: String
    })
    description?: string;

    @Prop({
        required: false,
        type: Number
    })
    publicationYear?: number;

    @Prop({
        required: false,
        type: String
    })
    language?: string;

    @Prop({
        required: false,
        type: String
    })
    publicator?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);