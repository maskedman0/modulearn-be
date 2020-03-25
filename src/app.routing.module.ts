import { GuideController } from "./guide/guide.controller";
import { configurations } from "./configurations";
import { UserController } from "./user/user.controller";

export const routes = [
   {
      controllers: [GuideController, UserController],
      middlewares: [],
      path: `${configurations.API_ROOT}/${configurations.API_VERSION}`,
   },
];
