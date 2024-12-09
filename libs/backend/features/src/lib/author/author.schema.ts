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
        required: true 
    })
    email!: string;

    @Prop({ 
        required: true 
    })
    birthDate!: Date;

    @Prop({ 
        required: true 
    })
    bio!: string;

    @Prop({ 
        required: true 
    })
    photo!: string;

    @Prop({ 
        type: [{ 
            type: String, ref: 'Book' 
        }], 
        required: true 
    })
    bookIds!: string[]; 
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
