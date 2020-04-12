import jwt from "express-jwt";
import { authenticate } from "passport";
import { Request, Response, NextFunction } from "express";
import { config } from "dotenv";

import error from "../functions/return-error.function";

config();

const root = `${process.env.API_ROOT}/${process.env.API_VERSION}`;

const unvalidatedPaths = [
   /** USERS ROUTES */
   { url: `${root}/users`, methods: ["POST"] },
   { url: `${root}/users/admin/login`, methods: ["POST"] },
   { url: `${root}/users/reader/login`, methods: ["POST"] },
   { url: `${root}/users/publisher/login`, methods: ["POST"] },
];

const localAuth = authenticate("local", { session: false });

const authGuard = jwt({ secret: process.env.API_SECRET }).unless({ path: unvalidatedPaths });

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
   return error({
      res,
      status: err.status || 500,
      message: err.message || "Server Error",
      data: { error: err.message || err },
   });
};

export { localAuth, authGuard, errorHandler };
