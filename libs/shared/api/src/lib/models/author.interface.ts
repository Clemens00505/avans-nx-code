import { IEntity } from "../../../../../share-a-meal/common/src";

export interface IAuthor extends IEntity {
    name: string;
    email: string;
    birthDate: Date;
    bio: string;
    photo: string;
    books: {
        _id: string;
        title: string;
    }[];
}

export type ICreateAuthor = Pick<IAuthor, 'name' | 'email' | 'birthDate' | 'bio' | 'photo' | 'books'>;
export type IUpdateAuthor = Partial<Omit<IAuthor, 'id'>>;
export type IUpsertAuthor = IAuthor;