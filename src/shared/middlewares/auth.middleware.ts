import { authenticate } from "passport";
import jwt from "express-jwt";
import { config } from "dotenv";
import returnError from "../functions/return-error.function";
import { Request, Response, NextFunction } from "express";

config();

const root = `${process.env.API_ROOT}/${process.env.API_VERSION}`;
const unvalidatedPaths = [
   { url: `${root}/users`, methods: ["POST"] },
   { url: `${root}/users/admin/login`, methods: ["POST"] },
   { url: `${root}/users/reader/login`, methods: ["POST"] },
   { url: `${root}/users/publisher/login`, methods: ["POST"] },
];

const localAuth = authenticate("local", { session: false });
const authGuard = jwt({ secret: process.env.API_SECRET }).unless({ path: unvalidatedPaths });

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
   returnError({
      res,
      status: err.status || 500,
      message: err.message || "Server Error",
      data: { error: err.message || err },
   });
   return;
};

export { localAuth, authGuard, errorHandler };
