import passport from "passport";
import { Strategy } from "passport-local";
import User from "../user/user.model";

export default () => {
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
};
