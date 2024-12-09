import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Author.name, schema: AuthorSchema }
        ])
    ],
    controllers: [AuthorController],
    providers: [AuthorService],
    exports: [AuthorService, MongooseModule]
})
export class AuthorModule {}