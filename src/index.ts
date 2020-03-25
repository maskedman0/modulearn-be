import { AppModule } from "./app.module";
import { MayaJS } from "@mayajs/core";
import { configurations } from "./configurations";
import passport from "passport";
import { Strategy } from "passport-local";
import User from "./user/user.model";

const server = new MayaJS(AppModule);
server.use(() => {
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
});
server.prodMode(configurations.production).start(configurations.APP_PORT as number);
