import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule,
        MongooseModule.forFeature([
            { name: Author.name, schema: AuthorSchema }
        ])
    ],
    controllers: [AuthorController],
    providers: [AuthorService, AuthorModule],
    exports: [AuthorService, AuthorModule, MongooseModule]
})
export class AuthorModule {}