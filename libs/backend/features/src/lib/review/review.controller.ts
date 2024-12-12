import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
    UseGuards
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from '../../../../dto/src';
import { Review } from './review.schema';
import { BooksService } from '../book/book.service';
import { AuthGuard } from '../../../../auth/src';

@UseGuards(AuthGuard)
@Controller('review')
export class ReviewController {
    constructor(
        private readonly reviewService: ReviewService,
        private readonly bookService: BooksService
    ) {}

    @Get()
    async findAll(): Promise<Review[]> {
        return this.reviewService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Review | null> {
        return this.reviewService.findOne(id);
    }

    @Post()
    async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return this.reviewService.create(createReviewDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateReviewDto: UpdateReviewDto
    ): Promise<Review | null> {
        return this.reviewService.update(id, updateReviewDto);
    }

    @Delete(':bookId/:reviewId')
    async removeReviewFromBook(@Param('bookId') bookId: string, @Param('reviewId') reviewId: string): Promise<void> {
        await this.bookService.removeReviewFromBook(bookId, reviewId);
        await this.reviewService.remove(reviewId);
    }
}