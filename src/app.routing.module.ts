import { GuideController } from "./guide/guide.controller";
import { configurations } from "./configurations";

export const routes = [
   {
      controllers: [GuideController],
      middlewares: [],
      path: `${configurations.API_ROOT}/${configurations.API_VERSION}`,
   },
];
