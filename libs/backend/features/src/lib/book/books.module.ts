import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './book.controller';
import { BooksService } from './book.service';
import { Book, BookSchema } from './books.schema';
import { ReviewModule } from '../review/review.module';
import { AuthorModule } from '../author/author.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule,
        AuthorModule,
        MongooseModule.forFeature([
            { name: Book.name, schema: BookSchema }
        ])
    ],
    controllers: [BooksController],
    providers: [BooksService, BooksModule],
    exports: [BooksService, MongooseModule]
})
export class BooksModule {}