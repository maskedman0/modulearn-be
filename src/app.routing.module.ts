import { GuideController } from "./guide/guide.controller";
import { configurations } from "./configurations";
import { UserController } from "./user/user.controller";
import { authGuard, errorHandler } from "./shared/middlewares/auth.middleware";

export const routes = [
   {
      controllers: [GuideController, UserController],
      middlewares: [authGuard, errorHandler],
      path: `${configurations.API_ROOT}/${configurations.API_VERSION}`,
   },
];
