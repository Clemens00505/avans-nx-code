import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from '../../../../dto/src';
import { Author } from './author.schema';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Get()
    async findAll(): Promise<Author[]> {
        return this.authorService.findAll();
    }

    // Get author only name
    @Get('name')
    async findAllNames(): Promise<string[]> {
        const authors = await this.authorService.findAll();
        return authors.map((author) => author.name);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Author | null> {
        return this.authorService.findOne(id);
    }

    @Post()
    async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
        return this.authorService.create(createAuthorDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAuthorDto: UpdateAuthorDto
    ): Promise<Author | null> {
        return this.authorService.update(id, updateAuthorDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Author | null> {
        return this.authorService.remove(id);
    }
}