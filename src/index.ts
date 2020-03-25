import { AppModule } from "./app.module";
import { MayaJS } from "@mayajs/core";
import { configurations, configurePassport } from "./configurations";

const server = new MayaJS(AppModule);
server.use(configurePassport);
server.prodMode(configurations.production).start(configurations.APP_PORT as number);
