import { Document, PassportLocalDocument } from "mongoose";

export enum Gender {
   m = "m",
   f = "f",
   u = "u",
}

export enum UserType {
   admin = "admin",
   publisher = "publisher",
   reader = "reader",
}

export interface IUser {
   readonly firstName: string;
   readonly lastName: string;
   readonly userType: UserType;
   readonly email?: string;
   readonly password?: string;
   readonly confirmPassword?: string;
   readonly username?: string;
   readonly gender?: Gender;
   readonly birthDate?: Date | string;
   readonly fullAddress?: string;
   readonly mobile?: string;
   readonly phone?: string;
}

export interface IUserModel extends IUser, PassportLocalDocument {}

export interface IUserModelToken {
   readonly user: IUserModel;
   readonly token: string;
}
