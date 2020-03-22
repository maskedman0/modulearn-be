import { Document } from "mongoose";

export interface IGuide {
   readonly title: string;
   readonly author: string;
}

export enum GuideEstimatedCompletionUnit {
   minute = "minute",
   hour = "hour",
   day = "day",
   week = "week",
}

export enum GuideMediaType {
   image = "image",
   video = "video",
}

export enum GuideDifficulty {
   easy = "easy",
   intermediate = "intermediate",
   advanced = "advanced",
}

export interface IGuideMedia {
   readonly mediaType: GuideMediaType;
   readonly mediaUrl: string;
   readonly publicId: string;
}

export interface IGuideStep {
   readonly media: IGuideMedia[];
   readonly instructionMarkUp: string;
}

export interface IGuideComponents {
   readonly media: IGuideMedia[];
   readonly description: string;
   readonly additionalInfo: string;
}

export interface IGuideIngredients {
   readonly media: IGuideMedia[];
   readonly description: string;
   readonly additionalInfo: string;
}

export interface IGuideEstimatedCompletion {
   readonly timeNum: number;
   readonly unit: GuideEstimatedCompletionUnit;
}

export interface IGuideV2 {
   readonly title: string;
   readonly creator: string;
   readonly difficulty: GuideDifficulty;
   readonly estimatedCompletion: IGuideEstimatedCompletion;
   readonly intro: string;
   readonly previewMedia: IGuideMedia;
   readonly steps: IGuideStep[];
   readonly components: IGuideComponents[];
   readonly ingredients: IGuideIngredients[];
   readonly isDraft: boolean;
   readonly isPublished: boolean;
}

export interface IGuideModel extends IGuide, Document {}
export interface IGuideV2Model extends IGuideV2, Document {}
