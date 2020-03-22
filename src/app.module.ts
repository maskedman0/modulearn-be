import { App } from "@mayajs/core";
import { Mongo } from "@mayajs/mongo";
import { routes } from "./app.routing.module";
import { configurations } from "./configurations";

@App({
   cors: true,
   logs: configurations.production ? "prod" : "dev",
   port: configurations.APP_PORT as number,
   database: Mongo({
      connectionString: configurations.MONGO_URL,
      options: {
         useCreateIndex: true,
         useNewUrlParser: true,
         useFindAndModify: false,
         useUnifiedTopology: true,
      },
   }),
   routes,
})
export class AppModule {}
