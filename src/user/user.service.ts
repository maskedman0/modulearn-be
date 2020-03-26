import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { Model } from "mongoose";
import { IUserModel, IUser, IUserModelToken } from "./user";
import User from "./user.model";
import { sign } from "jsonwebtoken";
import { configurations } from "../configurations";

@Injectable()
export class UserService {
   @Models("users") userModel: Model<IUserModel>;

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

   async findOne(query: {}): Promise<IUserModel> {
      return await this.userModel.findOne(query).exec();
   }

   async generatePublisherToken(email: string): Promise<IUserModelToken> {
      const user = await this.findOne({ userType: "publisher", username: email });

      if (user) {
         const payload = { id: user._id, role: user.userType };
         return {
            user,
            token: sign(payload, configurations.API_SECRET, { expiresIn: configurations.API_TOKEN_TIME }),
         };
      }
   }
}
