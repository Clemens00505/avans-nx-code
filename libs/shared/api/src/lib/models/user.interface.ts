import { IEntity } from 'libs/share-a-meal/common/src/lib/entity/entity.model';
import { IToken, IUserRegistration } from './auth.interface';
import { Id } from './id.type';

export enum UserRole {
    Guest = 'Guest',
    Admin = 'Admin',
    Unknown = 'Unknown'
}

export enum UserGender {
    Male = 'Male',
    Female = 'Female',
    None = 'None',
    Unknown = 'Unknown'
}

/**
 * Minimal user information
 */

export interface IUserIdentity extends IEntity {
    name: string;
    emailAddress: string;
    profileImgUrl: string;
}

/**
 * All user information, excl. domain entities
 */
export interface IUserInfo extends IUserRegistration {
    _id: Id;
    profileImgUrl: string;
    phoneNumber: string;
    role: UserRole;
    gender: UserGender;
    isActive: boolean;
    address: string;
}

/**
 * All user information, incl. domain entities
 */
export interface IUser extends IUserInfo {}

export type ICreateUser = Pick<IUser, 'name' | 'password' | 'emailAddress'>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;
