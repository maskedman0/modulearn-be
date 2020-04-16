import { Request, Response, NextFunction } from "express";
import errorResponse from "../functions/return-error.function";
import { FORBIDDEN } from "http-status";

const unAuthMessage = "Not authorized to perform this action.";

export function IsAdmin(req: Request, res: Response, next: NextFunction) {
   if (req.user && req.user["role"] !== "admin") {
      return errorResponse({
         res,
         status: FORBIDDEN,
         message: `${unAuthMessage}`,
         data: { error: { message: `${unAuthMessage}` } },
      });
   }
   next();
}

export function IsPublisher(req: Request, res: Response, next: NextFunction) {
   if (req.user && req.user["role"] !== "publisher") {
      return errorResponse({
         res,
         status: FORBIDDEN,
         message: `${unAuthMessage}`,
         data: { error: { message: `${unAuthMessage}` } },
      });
   }
   next();
}
export function IsReader(req: Request, res: Response, next: NextFunction) {
   if (req.user && req.user["role"] !== "reader") {
      return errorResponse({
         res,
         status: FORBIDDEN,
         message: `${unAuthMessage}`,
         data: { error: { message: `${unAuthMessage}` } },
      });
   }
   next();
}
