import { Document } from "mongoose";

export interface IGuide {
   readonly title: string;
   readonly author: string;
}

export interface IGuideModel extends IGuide, Document {}
