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
      path: "/publisher/login",
      middlewares: [localAuth],
   })
   async publisherLogin(req: Request, res: Response) {
      try {
         const userToken = await this.userService.generateToken(req.body.email, "publisher");
         if (!userToken && !userToken.token) {
            returnError({ res, status: FORBIDDEN, data: { error: { message: "Invalid Credentials" } } });
         } else {
            returnSuccess({ res, status: OK, message: `Welcome back ${userToken.user.firstName}!`, data: { token: userToken.token } });
         }
      } catch (error) {
         returnError({ res, status: error.status || 500, message: error.message, data: { error: { message: "Invalid Credentials" } } });
      }
   }

   @Post({
      path: "/reader/login",
      middlewares: [localAuth],
   })
   async readerLogin(req: Request, res: Response) {
      try {
         const userToken = await this.userService.generateToken(req.body.email, "reader");
         if (!userToken && !userToken.token) {
            returnError({ res, status: FORBIDDEN, data: { error: { message: "Invalid Credentials" } } });
         }
         returnSuccess({ res, status: OK, message: `Welcome back ${userToken.user.firstName}!`, data: { token: userToken.token } });
      } catch (error) {
         returnError({ res, status: error.status || 500, message: error.message, data: { error: { message: "Invalid Credentials" } } });
      }
   }

   @Post({
      path: "/admin/login",
      middlewares: [localAuth],
   })
   async adminLogin(req: Request, res: Response) {
      try {
         const userToken = await this.userService.generateToken(req.body.email, "admin");

         if (!userToken && !userToken.token) {
            returnError({ res, status: FORBIDDEN, data: { error: { message: "Invalid Credentials" } } });
         }

         returnSuccess({ res, status: OK, message: `Welcome back ${userToken.user.firstName}!`, data: { token: userToken.token } });
      } catch (error) {
         returnError({ res, status: error.status || 500, message: error.message, data: { error: { message: "Invalid Credentials" } } });
      }
   }
}
