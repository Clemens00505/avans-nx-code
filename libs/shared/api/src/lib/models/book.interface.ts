import { IEntity } from '../../../../../share-a-meal/common/src';
import { IToken, IUserRegistration } from './auth.interface';
import { Id } from './id.type';

export enum genre {
    Fiction = 'Fiction',
    NonFiction = 'NonFiction',
    Unknown = 'Unknown'
}

export interface IBook extends IEntity {
    coverUrl:string;
    title: string;
    genre: genre;
    description: string;
    author: string;
}

export type ICreateBook = Pick<IBook, 'coverUrl' | 'title' | 'genre' | 'description' | 'author'>;
export type IUpdateBook = Partial<Omit<IBook, 'id'>>;
export type IUpsertBook = IBook;