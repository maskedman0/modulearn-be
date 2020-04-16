import passport from "passport";
import { Strategy } from "passport-local";
import User from "../user/user.model";
import { MayaJS } from "@mayajs/core";

export default (server: MayaJS) => {
   server.use(passport.initialize());
   passport.use(
      new Strategy(
         {
            usernameField: "email",
            passwordField: "password",
         },
         User.authenticate()
      )
   );
   passport.serializeUser(User.serializeUser());
   passport.deserializeUser(User.deserializeUser());
   return server;
};
