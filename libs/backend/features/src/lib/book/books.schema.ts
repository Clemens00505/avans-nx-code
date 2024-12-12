import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { IsMongoId } from 'class-validator';
import { IReview } from 'libs/shared/api/src/lib/models/review.interface';
import { Review, ReviewSchema } from '../review/review.schema';

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
    author_id?: string;

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

    @Prop({
        required: false,
        type: String
    })
    creator_id?: string;

    @Prop({ 
        required: false,
        type: [ReviewSchema] 
    })
    reviews?: IReview[];
}

export const BookSchema = SchemaFactory.createForClass(Book);