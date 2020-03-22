import { Get, Post, Delete, Put } from "@mayajs/common";
import { Request, Response } from "express";
import { Controller } from "@mayajs/core";
import { GuideService } from "./guide.service";
import { CREATED, OK, NOT_FOUND, UNPROCESSABLE_ENTITY } from "http-status";
import { IGuideV2 } from "./guide";

@Controller({
   model: "./guide.model",
   route: "/guide",
})
export class GuideController {
   constructor(private guideService: GuideService) {}

   @Post({ path: "/" })
   async add(req: Request, res: Response) {
      const createdGuide = await this.guideService.create(req.body as IGuideV2);
      if (!createdGuide) {
         res.status(UNPROCESSABLE_ENTITY)
            .send("Invalid guide object.")
            .end();
         return;
      }

      res.status(CREATED)
         .send(createdGuide)
         .end();
   }

   @Get({ path: "/" })
   async list(req: Request, res: Response) {
      let guides: IGuideV2[];
      if (req.query) {
         guides = await this.guideService.find(req.query);
      } else {
         guides = await this.guideService.list();
      }

      res.status(OK)
         .send(guides)
         .end();
   }

   @Get({ path: "/:id" })
   async findById(req: Request, res: Response) {
      const guide = await this.guideService.findOne({ _id: req.params.id });
      if (!guide) {
         res.status(NOT_FOUND)
            .send("Guide not found.")
            .end();
         return;
      }

      res.status(OK)
         .send(guide)
         .end();
   }

   @Put({ path: "/:id" })
   async update(req: Request, res: Response) {
      const updatedGuide = await this.guideService.update(req.params.id, req.body);
      if (!updatedGuide) {
         res.status(NOT_FOUND)
            .send("Guide not found.")
            .end();
         return;
      }

      res.status(OK)
         .send(updatedGuide)
         .end();
   }

   @Delete({ path: "/:id" })
   async delete(req: Request, res: Response) {
      try {
         const deletedGuide = await this.guideService.delete(req.params.id);

         if (!deletedGuide) {
            res.status(NOT_FOUND)
               .send("Guide not found.")
               .end();
            return;
         }

         res.status(OK)
            .send(deletedGuide)
            .end();
      } catch (error) {
         throw new Error(error.message);
      }
   }
}
