import { Get, Post, Delete, Put } from "@mayajs/common";
import { Controller } from "@mayajs/core";
import { Request, Response } from "express";
import { CREATED, OK, NOT_FOUND } from "http-status";
import { UnprocessableEntity, NotFound } from "http-errors";

import respondError from "../shared/functions/return-error.function";
import successResponse from "../shared/functions/return-success.function";

import { GuideService } from "./guide.service";
import { IGuideV2 } from "./guide";
import { IsPublisher } from "../shared/middlewares/permissions.middleware";

@Controller({
   model: "./guide.model",
   route: "/guide",
})
export class GuideController {
   constructor(private guideService: GuideService) {}

   @Post({ path: "/", middlewares: [IsPublisher] })
   async add(req: Request | any, res: Response) {
      try {
         const guideToCreate = { ...req.body, creatorId: req.user.id } as IGuideV2;
         const createdGuide = await this.guideService.create(guideToCreate);

         if (!createdGuide) {
            throw new UnprocessableEntity("Invalid guide object.");
         }

         return successResponse({ res, status: CREATED, data: createdGuide });
      } catch (error) {
         respondError({ res, status: error.status, message: error.message, data: { error: { message: error.message || "Error" } } });
      }
   }

   @Get({ path: "/" })
   async list(req: Request, res: Response) {
      try {
         let guides: IGuideV2[];
         if (req.query) {
            guides = await this.guideService.find(req.query);
         } else {
            guides = await this.guideService.list();
         }

         return successResponse({ res, status: OK, data: guides });
      } catch (error) {
         respondError({ res, status: error.status, message: error.message, data: { error: { message: error.message || "Error" } } });
      }
   }

   @Get({ path: "/:id" })
   async findById(req: Request, res: Response) {
      try {
         const guide = await this.guideService.findOne({ _id: req.params.id });
         if (!guide) {
            throw new NotFound("Guide not found.");
         }

         return successResponse({ res, status: OK, data: guide });
      } catch (error) {
         respondError({ res, status: error.status, message: error.message, data: { error: { message: error.message || "Error" } } });
      }
   }

   @Put({ path: "/:id" })
   async update(req: Request, res: Response) {
      try {
         const updatedGuide = await this.guideService.update(req.params.id, req.body);

         if (!updatedGuide) {
            throw new NotFound("Guide not found.");
         }

         return successResponse({ res, status: OK, data: updatedGuide });
      } catch (error) {
         respondError({ res, status: error.status, message: error.message, data: { error: { message: error.message || "Error" } } });
      }
   }

   @Delete({ path: "/:id" })
   async delete(req: Request, res: Response) {
      try {
         const deletedGuide = await this.guideService.delete(req.params.id);

         if (!deletedGuide) {
            throw new NotFound("Guide not found.");
         }

         return successResponse({ res, status: OK, data: deletedGuide });
      } catch (error) {
         respondError({ res, status: error.status, message: error.message, data: { error: { message: error.message || "Error" } } });
      }
   }
}
