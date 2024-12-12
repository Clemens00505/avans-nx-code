import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review, ReviewSchema } from './review.schema';
import { Book } from '../book/books.schema';
import { BooksModule } from '../book/books.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:
     [
        JwtModule,
        MongooseModule.forFeature([
            { name: Review.name, schema: ReviewSchema }
        ]),
        BooksModule
    ],
    controllers: [ReviewController],
    providers: [ReviewService],
    exports: [ReviewService]
})
export class ReviewModule {}