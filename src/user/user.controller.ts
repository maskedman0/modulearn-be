import { Get, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { CREATED, UNPROCESSABLE_ENTITY, OK, FORBIDDEN } from "http-status";
import { UserService } from "./user.service";
import { IUser } from "./user";
import returnError from "../shared/functions/return-error.function";
import returnSuccess from "../shared/functions/return-success.function";
import { localAuth } from "../shared/middlewares/auth.middleware";

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

   @Post({
      path: "/login",
      middlewares: [localAuth],
   })
   async login(req: Request, res: Response) {
      const userToken = await this.userService.generatePublisherToken(req.body.email);
      if (userToken.token) {
         returnSuccess({ res, status: OK, message: `Welcome back ${userToken.user.firstName}`, data: { token: userToken.token } });
      } else {
         returnError({ res, status: FORBIDDEN, data: { error: { message: "Invalid Credentials" } } });
      }
   }
}
