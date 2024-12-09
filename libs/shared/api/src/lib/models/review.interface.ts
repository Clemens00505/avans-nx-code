import { IEntity } from "../../../../../share-a-meal/common/src";
import { Id } from "./id.type";

export interface IReview extends IEntity {
    reviews: never[];
    user: {
        _id: Id;
        name: string;
    };
    bookId: Id;
    title: string;
    rating: number;
    comment: string;
    dateAndTime: Date;
}

export type ICreateReview = Pick<IReview, 'user' | 'bookId' | 'title' | 'rating' | 'comment' | 'dateAndTime'>;
export type IUpdateReview = Partial<Omit<IReview, 'id'>>;
export type IUpsertReview = IReview;