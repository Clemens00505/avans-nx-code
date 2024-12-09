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
            type: String, ref: 'Book' 
        }], 
        required: true 
    })
    bookIds!: string[]; 
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
