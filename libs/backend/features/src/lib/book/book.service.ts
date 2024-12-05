import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './books.schema';
import { CreateBookDto, UpdateBookDto } from '../../../../dto/src';

@Injectable()
export class BooksService {
    private readonly logger: Logger = new Logger(BooksService.name);

    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>
    ) {}

    async findAll(): Promise<Book[]> {
        this.logger.log(`Finding all books`);
        return this.bookModel.find().populate('reviews').exec();
    }

    async findOne(_id: string): Promise<Book | null> {
        this.logger.log(`Finding book with id ${_id}`);
        return this.bookModel.findById(_id).populate('reviews').exec();
    }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        this.logger.log(`Create book ${createBookDto.title}`);
        const createdBook = new this.bookModel(createBookDto);
        return createdBook.save();
    }

    async update(_id: string, updateBookDto: UpdateBookDto): Promise<Book | null> {
        this.logger.log(`Update book ${updateBookDto.title}`);
        return this.bookModel.findByIdAndUpdate(_id, updateBookDto, { new: true }).exec();
    }

    async remove(_id: string): Promise<Book | null> {
        this.logger.log(`Remove book with id ${_id}`);
        return this.bookModel.findByIdAndDelete(_id).exec();
    }
}