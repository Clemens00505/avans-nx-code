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
        type: Number
    })
    publicationYear?: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);