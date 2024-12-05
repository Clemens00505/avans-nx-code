import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
    @Prop({
        required: true,
        type: {
            userId: { type: String, required: true },
            name: { type: String, required: true }
        }
    })
    user!: {
        userId: string;
        name: string;
    };

    @Prop({
        required: true,
        type: String
    })
    bookId!: string;

    @Prop({
        required: true,
        type: String
    })
    title!: string;

    @Prop({
        required: true,
        type: Number,
        min: 1,
        max: 5
    })
    rating!: number;

    @Prop({
        required: true,
        type: String
    })
    comment!: string;

    @Prop({
        required: true,
        type: Date,
        default: Date.now
    })
    dateAndTime!: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);