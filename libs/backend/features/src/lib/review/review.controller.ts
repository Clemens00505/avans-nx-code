import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from '../../../../dto/src';
import { Review } from './review.schema';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

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

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Review | null> {
        return this.reviewService.remove(id);
    }
}