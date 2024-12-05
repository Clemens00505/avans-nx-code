import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './book.controller';
import { BooksService } from './book.service';
import { Book, BookSchema } from './books.schema';
import { ReviewModule } from '../review/review.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Book.name, schema: BookSchema }
        ])
    ],
    controllers: [BooksController],
    providers: [BooksService],
    exports: [BooksService, MongooseModule]
})
export class BooksModule {}