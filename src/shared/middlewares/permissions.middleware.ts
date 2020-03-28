import { Request, Response, NextFunction } from "express";
import errorResponse from "../functions/return-error.function";
import { FORBIDDEN } from "http-status";

const unAuthMessage = "Not authorize to perform this action.";

export function IsAdmin(req: Request | any, res: Response, next: NextFunction) {
   if (req.user && req.user.role !== "admin") {
      return errorResponse({
         res,
         status: FORBIDDEN,
         message: `${unAuthMessage}`,
         data: { error: { message: `${unAuthMessage}` } },
      });
   }
   next();
}

export function IsPublisher(req: Request | any, res: Response, next: NextFunction) {
   if (req.user && req.user.role !== "publisher") {
      return errorResponse({
         res,
         status: FORBIDDEN,
         message: `${unAuthMessage}`,
         data: { error: { message: `${unAuthMessage}` } },
      });
   }
   next();
}
export function IsReader(req: Request | any, res: Response, next: NextFunction) {
   if (req.user && req.user.role !== "reader") {
      return errorResponse({
         res,
         status: FORBIDDEN,
         message: `${unAuthMessage}`,
         data: { error: { message: `${unAuthMessage}` } },
      });
   }
   next();
}
