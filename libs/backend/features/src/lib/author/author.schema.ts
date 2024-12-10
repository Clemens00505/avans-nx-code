// author.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema()
export class Author {
    @Prop({ 
        required: true 
    })
    name!: string;

    @Prop({ 
        required: false 
    })
    email?: string;

    @Prop({ 
        required: false 
    })
    birthDate?: Date;

    @Prop({ 
        required: false 
    })
    bio?: string;

    @Prop({ 
        required: false 
    })
    photo?: string;

    @Prop({
        type: [{ 
            _id: { type: String, required: true },
            title: { type: String, required: true }
        }],
        required: false
    })
    books!: { _id: string, title: string }[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
