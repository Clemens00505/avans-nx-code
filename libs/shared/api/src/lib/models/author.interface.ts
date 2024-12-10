import { IEntity } from "../../../../../share-a-meal/common/src";
import { Id } from "./id.type";

export interface IAuthor extends IEntity {
    _id: Id;
    name: string;
    email?: string;
    birthDate?: Date;
    bio?: string;
    photo?: string;
    books: {
        _id: string;
        title: string;
    }[];
}

export interface IAuthorCreate {
    name: string;
    email?: string;
    birthDate?: Date;
    bio?: string;
    photo?: string;
    books?: {
        _id: string;
        title: string;
    }[];
}

export type ICreateAuthor = Pick<IAuthorCreate, 'name' | 'books'>;
export type IUpdateAuthor = Partial<Omit<IAuthor, 'id'>>;
export type IUpsertAuthor = IAuthorCreate;