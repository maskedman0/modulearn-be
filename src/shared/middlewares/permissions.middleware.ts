import { Request, Response, NextFunction } from "express";
import returnError from "../functions/return-error.function";
import { FORBIDDEN } from "http-status";

export function IsAdmin(req: Request | any, res: Response, next: NextFunction) {
   if (req.user && req.user.role !== "admin") {
      returnError({
         res,
         status: FORBIDDEN,
         message: "Invalid role",
         data: { error: { message: "Invalid role" } },
      });
   } else {
      next();
   }
}

export function IsPublisher(req: Request | any, res: Response, next: NextFunction) {
   if (req.user && req.user.role !== "publisher") {
      returnError({
         res,
         status: FORBIDDEN,
         message: "Invalid role",
         data: { error: { message: "Invalid role" } },
      });
   } else {
      next();
   }
}
export function IsReader(req: Request | any, res: Response, next: NextFunction) {
   if (req.user && req.user.role !== "reader") {
      returnError({
         res,
         status: FORBIDDEN,
         message: "Invalid role",
         data: { error: { message: "Invalid role" } },
      });
   } else {
      next();
   }
}
