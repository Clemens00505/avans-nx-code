import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete
} from '@nestjs/common';
import { BooksService } from './book.service';
import { CreateBookDto, UpdateBookDto } from '../../../dto/src';
import { Book } from './books.schema';

@Controller('book')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    async findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Book | null> {
        return this.booksService.findOne(id);
    }

    @Post()
    async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.create(createBookDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateBookDto: UpdateBookDto
    ): Promise<Book | null> {
        return this.booksService.update(id, updateBookDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Book | null> {
        return this.booksService.remove(id);
    }
}