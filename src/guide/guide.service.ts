import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { Model } from "mongoose";
import { IGuideV2Model, IGuideV2 } from "./guide";

@Injectable()
export class GuideService {
   @Models("guide") bookModel: Model<IGuideV2Model>;

   async create(book: IGuideV2): Promise<IGuideV2> {
      try {
         return await (await this.bookModel.create(book)).save();
      } catch (error) {
         throw error;
      }
   }

   async list(): Promise<IGuideV2[]> {
      try {
         return await this.bookModel.find().exec();
      } catch (error) {
         throw error;
      }
   }

   async find(query: any): Promise<IGuideV2[]> {
      try {
         return await this.bookModel.find(query).exec();
      } catch (error) {
         throw error;
      }
   }

   async findOne(query: any): Promise<IGuideV2> {
      try {
         return await this.bookModel.findOne(query).exec();
      } catch (error) {
         throw error;
      }
   }

   async update(id: string, book: IGuideV2): Promise<IGuideV2> {
      try {
         return await this.bookModel.findByIdAndUpdate(id, { $set: book }, { new: true, runValidators: true }).exec();
      } catch (error) {
         throw error;
      }
   }

   async delete(id: string): Promise<IGuideV2> {
      try {
         return await this.bookModel.findByIdAndDelete(id).exec();
      } catch (error) {
         throw error;
      }
   }
}
