import { Get, Post, Delete, Put } from "@mayajs/common";
import { Request, Response } from "express";
import { Controller } from "@mayajs/core";
import { CREATED, UNPROCESSABLE_ENTITY } from "http-status";
import { UserService } from "./user.service";
import { IUser } from "./user";
import returnError from "../shared/functions/return-error.function";
import returnSuccess from "../shared/functions/return-success.function";

@Controller({
   model: "./user.model",
   route: "/users",
})
export class UserController {
   constructor(private userService: UserService) {}

   @Post({ path: "/" })
   async register(req: Request, res: Response) {
      const user = await this.userService.register(req.body as IUser).catch(error => {
         const message = error || "Invalid user registration";
         returnError({ res, status: UNPROCESSABLE_ENTITY, message, data: { error: { message } } });
      });

      if (user) {
         returnSuccess({ res, status: CREATED, data: user });
      }
   }
}
