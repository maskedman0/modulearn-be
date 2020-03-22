import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { Model } from "mongoose";
import { IGuideModel, IGuide } from "./guide";

@Injectable()
export class GuideService {
   @Models("guide") bookModel: Model<IGuideModel>;

   async create(book: IGuide): Promise<IGuide> {
      try {
         return await (await this.bookModel.create(book)).save();
      } catch (error) {
         return error;
      }
   }

   async list(): Promise<IGuide[]> {
      try {
         return await this.bookModel.find().exec();
      } catch (error) {
         throw new Error(error.message);
      }
   }

   async find(query: any): Promise<IGuide[]> {
      try {
         return await this.bookModel.find(query).exec();
      } catch (error) {
         throw new Error(error.message);
      }
   }

   async findOne(query: any): Promise<IGuide> {
      try {
         return await this.bookModel.findOne(query).exec();
      } catch (error) {
         throw new Error(error.message);
      }
   }

   async update(id: string, book: IGuide): Promise<IGuide> {
      try {
         return await this.bookModel.findByIdAndUpdate(id, { $set: book }, { new: true, runValidators: true }).exec();
      } catch (error) {
         throw new Error(error.message);
      }
   }

   async delete(id: string): Promise<IGuide> {
      try {
         return await this.bookModel.findByIdAndDelete(id).exec();
      } catch (error) {
         throw new Error(GuideService.name + error.message);
      }
   }
}
