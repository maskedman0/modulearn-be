import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { Model } from "mongoose";
import { IUserModel, IUser } from "./user";
import User from "./user.model";

@Injectable()
export class UserService {
   @Models("user") userModel: Model<IUserModel>;

   async register(user: IUser): Promise<IUser> {
      return new Promise((resolve, reject) => {
         User.register(
            new User({
               firstName: user.firstName,
               lastName: user.lastName,
               username: user.email,
               userType: user.userType,
               gender: user.gender,
               birthDate: new Date(user.birthDate) || undefined,
               fullAddress: user.fullAddress,
               mobile: user.mobile,
               phone: user.phone,
            }),
            user.password,
            (error, createdUser: IUser) => {
               if (error && error.message) {
                  reject(error.message);
               } else {
                  resolve(createdUser);
               }
            }
         );
      });
   }
}
