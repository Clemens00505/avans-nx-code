import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './books.schema';
import { CreateBookDto, UpdateBookDto } from '../../../../dto/src';
import { Author, AuthorDocument } from '../author/author.schema';

@Injectable()
export class BooksService {
    private readonly logger: Logger = new Logger(BooksService.name);

    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    ) {}

    async findAll(): Promise<Book[]> {
        this.logger.log(`Finding all books`);
        return this.bookModel.find().exec();
    }

    async findOne(_id: string): Promise<Book | null> {
        this.logger.log(`Finding book with id ${_id}`);
        return this.bookModel.findById(_id).exec();
    }

    async createBook(createBookDto: CreateBookDto): Promise<Book> {
        const { author: authorName, ...bookData } = createBookDto;
    
        let author = await this.authorModel.findOne({ name: authorName }).exec() as AuthorDocument | null;
        if (!author) {
            this.logger.log(`Author ${authorName} not found. Creating a new author.`);
            author = new this.authorModel({ name: authorName, books: [] });
            await author.save();
        }
    
        const book = new this.bookModel({ ...bookData, author_id: author.id.toString(), author: author.name });
        await book.save();
    
        this.logger.log(`Book ${book.title} created. Updating author ${author.name}`);
        author.books.push({ _id: book._id, title: book.title });
        await author.save();
    
        return book;
    }

    async deleteBookFromAuthor(bookId: string, authorId: string): Promise<void> {
        this.logger.log(`Deleting book with id ${bookId} from author with id ${authorId}`);
        await this.authorModel.findByIdAndUpdate
            (authorId, { $pull: { books: { _id: bookId } } }).exec();
    }

    async update(_id: string, updateBookDto: UpdateBookDto): Promise<Book | null> {
        this.logger.log(`Update book with id ${_id}`);
        return this.bookModel.findByIdAndUpdate(_id, updateBookDto, { new: true }).exec();
    }

    async remove(_id: string): Promise<Book | null> {
        this.logger.log(`Remove book with id ${_id}`);
        return this.bookModel.findByIdAndDelete(_id).exec();
    }

    async removeReviewFromBook(bookId: string, reviewId: string): Promise<void> {
        this.logger.log(`Remove review with id ${reviewId} from book with id ${bookId}`);
        await this.bookModel.findByIdAndUpdate(bookId, { $pull: { reviews: { _id: reviewId } } }).exec();
    }
}

