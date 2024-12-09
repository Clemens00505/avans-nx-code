import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Author, AuthorDocument } from './author.schema';
import { CreateAuthorDto, UpdateAuthorDto } from '../../../../dto/src';

@Injectable()
export class AuthorService {
    private readonly logger: Logger = new Logger(AuthorService.name);
    bookModel: any;

    constructor(
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>
    ) {}

    async findAll(): Promise<Author[]> {
        this.logger.log(`Finding all authors`);
        return this.authorModel.find().exec();
    }

    async findOne(_id: string): Promise<Author | null> {
        this.logger.log(`Finding author with id ${_id}`);
        return this.authorModel.findById(_id).exec();
    }

    async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
        this.logger.log(`Create author ${createAuthorDto.name}`);
        const createdAuthor = new this.authorModel(createAuthorDto);
        return createdAuthor.save();
    }

    async update(_id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author | null> {
        this.logger.log(`Update author ${updateAuthorDto.name}`);
        return this.authorModel.findByIdAndUpdate(_id, updateAuthorDto, { new: true }).exec();
    }

    async updateAuthor(authorId: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
        const author = await this.authorModel.findById(authorId).exec();
        if (!author) throw new NotFoundException('Author not found');
      
        // Update author's data
        Object.assign(author, updateAuthorDto);
        await author.save();
      
        // Optionally synchronize books if necessary
        if (updateAuthorDto.books) {
          await this.bookModel.updateMany(
            { _id: { $in: updateAuthorDto.books.map((b) => b._id) } },
            { author: authorId }
          );
        }
      
        return author;
      }      

    async remove(_id: string): Promise<Author | null> {
        this.logger.log(`Remove author with id ${_id}`);
        return this.authorModel.findByIdAndDelete(_id).exec();
    }
}