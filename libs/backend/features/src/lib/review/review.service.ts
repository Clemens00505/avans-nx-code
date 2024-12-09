import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './review.schema';
import { CreateReviewDto, UpdateReviewDto } from '../../../../dto/src';
import { Types } from 'mongoose';
import { Book, BookDocument } from '../book/books.schema';

@Injectable()
export class ReviewService {
    private readonly logger: Logger = new Logger(ReviewService.name);

    constructor(
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
        @InjectModel(Book.name) private bookModel: Model<BookDocument>
    ) {}

    async findAll(): Promise<Review[]> {
        this.logger.log(`Finding all reviews`);
        const items = await this.reviewModel.find().exec();
        return items;
    }

    async findOne(_id: string): Promise<Review | null> {
        this.logger.log(`Finding review with id ${_id}`);
        const item = await this.reviewModel.findOne({ _id }).exec();
        if (!item) {
            this.logger.debug('Review not found');
        }
        return item;
    }
    
    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        this.logger.log(`Create review ${createReviewDto.title}`);
        const createdReview = new this.reviewModel(createReviewDto);
        const savedReview = await createdReview.save();
    
        if (createReviewDto.bookId) {
            const fullReview = await this.reviewModel.findById(savedReview._id).exec();
    
            await this.bookModel.findByIdAndUpdate(
                new Types.ObjectId(createReviewDto.bookId),
                { $push: { reviews: fullReview } },
                { new: true }
            ).exec();
        } else {
            this.logger.warn('No bookId provided in createReviewDto');
        }
    
        return savedReview;
    }
    

    async update(_id: string, updateReviewDto: UpdateReviewDto): Promise<Review | null> {
        this.logger.log(`Update review ${updateReviewDto._id}`);
        const updatedReview = await this.reviewModel.findByIdAndUpdate(_id, updateReviewDto, { new: true }).exec();

        if (updatedReview && updateReviewDto.bookId) {
            await this.bookModel.findByIdAndUpdate(
                new Types.ObjectId(updateReviewDto.bookId),
                { $set: { "reviews.$[elem]": updatedReview } },
                { arrayFilters: [{ "elem._id": new Types.ObjectId(_id) }], new: true }
            ).exec();
        }

        return updatedReview;
    }

    async remove(_id: string): Promise<Review | null> {
        this.logger.log(`Remove review with id ${_id}`);
        return this.reviewModel.findByIdAndDelete(_id).exec();
      }
}