import { Post } from "@mayajs/common";
import { Controller } from "@mayajs/core";
import { Request, Response } from "express";
import { CREATED, OK } from "http-status";
import { Forbidden, UnprocessableEntity } from "http-errors";

import respondError from "../shared/functions/return-error.function";
import successResponse from "../shared/functions/return-success.function";
import { localAuth } from "../shared/middlewares/auth.middleware";

import { UserService } from "./user.service";
import { IUser, UserType } from "./user";

@Controller({
   model: "./user.model",
   route: "/users",
})
export class UserController {
   constructor(private userService: UserService) {}

   @Post({ path: "/" })
   async register(req: Request, res: Response) {
      try {
         const user = await this.userService.register(req.body as IUser).catch(error => {
            const message = error || "Invalid user registration";
            throw new UnprocessableEntity(message);
         });

         return successResponse({ res, status: CREATED, data: user });
      } catch (error) {
         respondError({ res, status: error.status, message: error.message, data: { error: { message: error.message || "Error" } } });
      }
   }

   @Post({
      path: "/publisher/login",
      middlewares: [localAuth],
   })
   async publisherLogin(req: Request, res: Response) {
      try {
         const userToken = await this.userService.generateToken(req.body.email, UserType.publisher);

         if (!userToken && !userToken.token) {
            throw new Forbidden("Invalid credentials.");
         }

         return successResponse({ res, status: OK, message: `Welcome back ${userToken.user.firstName}!`, data: { token: userToken.token } });
      } catch (error) {
         respondError({ res, status: error.status, message: error.message, data: { error: { message: error.message || "Error" } } });
      }
   }

   @Post({
      path: "/reader/login",
      middlewares: [localAuth],
   })
   async readerLogin(req: Request, res: Response) {
      try {
         const userToken = await this.userService.generateToken(req.body.email, UserType.reader);

         if (!userToken && !userToken.token) {
            throw new Forbidden("Invalid credentials.");
         }

         return successResponse({ res, status: OK, message: `Welcome back ${userToken.user.firstName}!`, data: { token: userToken.token } });
      } catch (error) {
         respondError({ res, status: error.status, message: error.message, data: { error: { message: error.message || "Error" } } });
      }
   }

   @Post({
      path: "/admin/login",
      middlewares: [localAuth],
   })
   async adminLogin(req: Request, res: Response) {
      try {
         const userToken = await this.userService.generateToken(req.body.email, UserType.admin);

         if (!userToken && !userToken.token) {
            throw new Forbidden("Invalid credentials.");
         }

         return successResponse({ res, status: OK, message: `Welcome back ${userToken.user.firstName}!`, data: { token: userToken.token } });
      } catch (error) {
         respondError({ res, status: error.status, message: error.message, data: { error: { message: error.message || "Error" } } });
      }
   }
}
